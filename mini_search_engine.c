#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_DOCS 128
#define MAX_WORD_LEN 64
#define MAX_TERMS_PER_DOC 4096
#define MAX_QUERY_TERMS 64

typedef struct {
    char word[MAX_WORD_LEN];
    int count;
} TermFreq;

typedef struct {
    char name[256];
    TermFreq terms[MAX_TERMS_PER_DOC];
    int term_count;
} Document;

typedef struct {
    int doc_index;
    int score;
} Result;

static int find_term(Document *doc, const char *word) {
    for (int i = 0; i < doc->term_count; i++) {
        if (strcmp(doc->terms[i].word, word) == 0) {
            return i;
        }
    }
    return -1;
}

static void add_word(Document *doc, const char *word) {
    if (word[0] == '\0') return;

    int idx = find_term(doc, word);
    if (idx >= 0) {
        doc->terms[idx].count++;
        return;
    }

    if (doc->term_count >= MAX_TERMS_PER_DOC) return;

    strncpy(doc->terms[doc->term_count].word, word, MAX_WORD_LEN - 1);
    doc->terms[doc->term_count].word[MAX_WORD_LEN - 1] = '\0';
    doc->terms[doc->term_count].count = 1;
    doc->term_count++;
}

static int load_document(Document *doc, const char *filename) {
    FILE *fp = fopen(filename, "r");
    if (!fp) return 0;

    strncpy(doc->name, filename, sizeof(doc->name) - 1);
    doc->name[sizeof(doc->name) - 1] = '\0';
    doc->term_count = 0;

    char word[MAX_WORD_LEN];
    int wlen = 0;
    int c;

    while ((c = fgetc(fp)) != EOF) {
        if (isalnum((unsigned char)c)) {
            if (wlen < MAX_WORD_LEN - 1) {
                word[wlen++] = (char)tolower((unsigned char)c);
            }
        } else if (wlen > 0) {
            word[wlen] = '\0';
            add_word(doc, word);
            wlen = 0;
        }
    }

    if (wlen > 0) {
        word[wlen] = '\0';
        add_word(doc, word);
    }

    fclose(fp);
    return 1;
}

static int score_document(const Document *doc, const char query_terms[][MAX_WORD_LEN], int query_count) {
    int score = 0;

    for (int q = 0; q < query_count; q++) {
        for (int i = 0; i < doc->term_count; i++) {
            if (strcmp(doc->terms[i].word, query_terms[q]) == 0) {
                score += doc->terms[i].count;
                break;
            }
        }
    }

    return score;
}

static int parse_query(const char *line, char query_terms[][MAX_WORD_LEN]) {
    int count = 0;
    char token[MAX_WORD_LEN];
    int tlen = 0;

    for (int i = 0;; i++) {
        int c = line[i];
        if (isalnum((unsigned char)c)) {
            if (tlen < MAX_WORD_LEN - 1) {
                token[tlen++] = (char)tolower((unsigned char)c);
            }
        } else {
            if (tlen > 0) {
                token[tlen] = '\0';
                if (count < MAX_QUERY_TERMS) {
                    strcpy(query_terms[count++], token);
                }
                tlen = 0;
            }
            if (c == '\0') break;
        }
    }

    return count;
}

static int compare_results(const void *a, const void *b) {
    const Result *ra = (const Result *)a;
    const Result *rb = (const Result *)b;
    return rb->score - ra->score;
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s <file1.txt> <file2.txt> ...\n", argv[0]);
        return 0;
    }

    Document *docs = calloc(MAX_DOCS, sizeof(Document));
    if (!docs) {
        fprintf(stderr, "Memory allocation failed.\n");
        return 1;
    }

    int doc_count = 0;

    for (int i = 1; i < argc && doc_count < MAX_DOCS; i++) {
        if (load_document(&docs[doc_count], argv[i])) {
            doc_count++;
        } else {
            fprintf(stderr, "Could not open: %s\n", argv[i]);
        }
    }

    if (doc_count == 0) {
        fprintf(stderr, "No documents loaded.\n");
        free(docs);
        return 1;
    }

    printf("Indexed %d document(s). Type a query or 'exit'.\n", doc_count);

    char line[1024];
    char query_terms[MAX_QUERY_TERMS][MAX_WORD_LEN];

    while (1) {
        printf("\nsearch> ");
        if (!fgets(line, sizeof(line), stdin)) break;

        if (strncmp(line, "exit", 4) == 0) break;

        int qcount = parse_query(line, query_terms);
        if (qcount == 0) {
            printf("Please enter at least one alphanumeric term.\n");
            continue;
        }

        Result results[MAX_DOCS];
        int rcount = 0;

        for (int i = 0; i < doc_count; i++) {
            int score = score_document(&docs[i], query_terms, qcount);
            if (score > 0) {
                results[rcount].doc_index = i;
                results[rcount].score = score;
                rcount++;
            }
        }

        if (rcount == 0) {
            printf("No matching documents.\n");
            continue;
        }

        qsort(results, rcount, sizeof(Result), compare_results);

        printf("Results:\n");
        for (int i = 0; i < rcount; i++) {
            printf("%d) %s (score=%d)\n", i + 1, docs[results[i].doc_index].name, results[i].score);
        }
    }

    free(docs);
    return 0;
}
