"use client";
import { useState } from "react";
import { BookOpen, Plus, Minus } from "lucide-react";

const SYLLABUS = {
  "Class 3": {
    "SECTION A : GRAMMAR": ["Nouns (Proper, Common, Abstract)", "Pronouns (he, she, it, they)", "Verbs (action words, is/am/are)", "Adjectives (describing words)", "Articles (a, an, the — basic use)", "Prepositions", "Simple sentences (subject + verb + object)", "Types of sentences (statement and question)"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Picture vocabulary", "Spelling Correction (simple words)", "One-word naming (basic objects)"],
    "SECTION C : READING AND COMPREHENSION": ["Very short unseen passages", "Direct questions (who, what, where)", "Identify correct answers from text"],
    "SECTION D : WRITING SKILLS": ["Sentence formation", "Picture-based sentences", "Jumbled Sentences Arrangement"],
    "SECTION E : EXCELLENCE ZONE": ["Odd one out", "Simple analogy", "Basic logical reasoning"],
  },
  "Class 4": {
    "SECTION A : GRAMMAR": ["Nouns (Proper, Common, Abstract and Collective)", "Pronouns (Personal, Possessive and Demonstrative)", "Verbs (is/am/are, has/have, past forms — basic)", "Adjectives (Degrees of Comparison)", "Adverbs (basic introduction — manner, time)", "Articles (a, an, the — correct usage)", "Prepositions (in, on, at, under, between, behind)", "Subject-Verb Agreement (basic rules)", "Types of Sentences (statement, question, exclamation)"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Homophones (basic)", "Prefix & Suffix (un-, re-, -ful, -less)", "Basic Idioms & Phrases", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Short unseen passages", "Direct and vocabulary-based questions", "True/False", "Fill in the blanks from passage", "Sequence of events"],
    "SECTION D : WRITING SKILLS": ["Sentence formation", "Short paragraph writing (guided)", "Sentence correction", "Rearranging sentences"],
    "SECTION E : EXCELLENCE ZONE": ["Word analogy", "Odd one out", "Basic coding-decoding", "Mixed grammar application"],
  },
  "Class 5": {
    "SECTION A : GRAMMAR": ["Nouns (Proper, Common, Collective, Abstract)", "Pronouns (Personal, Possessive, Reflexive)", "Verbs (Present and Past Tense)", "Adjectives (Degrees of Comparison)", "Adverbs (Manner, Time, Place)", "Articles & Determiners (basic usage)", "Prepositions (expanded usage)", "Conjunctions (and, but, because, so)", "Subject-Verb Agreement", "Types of Sentences (all types)"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Homonyms & Homophones", "Idioms & Phrases (basic usage)", "Word Formation (prefix & suffix)", "Spelling Accuracy"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (moderate level)", "Vocabulary from context", "Inference-based questions (basic)", "True/False and fill-ups"],
    "SECTION D : WRITING SKILLS": ["Dialogue completion", "Sentence transformation", "Rearranging of sentences"],
    "SECTION E : EXCELLENCE ZONE": ["Logical reasoning", "Word analogy (advanced)", "Coding-decoding", "Higher Order Thinking Questions (HOTS)"],
  },
  "Class 6": {
    "SECTION A : GRAMMAR": ["Nouns (kinds, number, gender, case)", "Pronouns (personal, reflexive, relative, interrogative)", "Verbs (tenses — present, past, future; auxiliary verbs)", "Adjectives (kinds and degrees of comparison)", "Adverbs (kinds and usage)", "Articles & Determiners", "Prepositions (basic and usage)", "Conjunctions (coordinating and subordinating)", "Subject-Verb Agreement", "Types of Sentences & Transformation of Sentences"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Homophones & Homonyms", "Prefix & Suffix", "Idioms & Phrases", "One-word Substitution", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (factual & literary)", "Direct & inferential questions", "Vocabulary-based questions", "True/False", "Sequencing & main idea"],
    "SECTION D : WRITING SKILLS": ["Paragraph writing", "Picture composition", "Sentence correction", "Rearranging sentences"],
    "SECTION E : EXCELLENCE ZONE": ["Word analogy", "Odd one out", "Coding-decoding", "Logical reasoning", "Mixed grammar application"],
  },
  "Class 7": {
    "SECTION A : GRAMMAR": ["Nouns (kinds and functions)", "Pronouns (all types)", "Verbs (tenses, modals, non-finite verbs — basic)", "Adjectives & Adverbs (forms and comparison)", "Articles & Determiners", "Prepositions (advanced usage)", "Conjunctions", "Active & Passive Voice (basic)", "Direct & Indirect Speech (basic)", "Subject-Verb Agreement"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Homophones & Homonyms", "Idioms & Phrases", "One-word Substitution", "Phrasal Verbs", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (discursive & narrative)", "Inferential & analytical questions", "Vocabulary usage", "Sequencing & theme"],
    "SECTION D : WRITING SKILLS": ["Story writing (guided)", "Notice writing (basic)", "Sentence correction"],
    "SECTION E : EXCELLENCE ZONE": ["Word analogy", "Odd one out", "Coding-decoding", "Logical reasoning", "Mixed grammar application"],
  },
  "Class 8": {
    "SECTION A : GRAMMAR": ["Parts of Speech (detailed revision)", "Tenses (all forms)", "Modals (can, could, may, might, must, etc.)", "Active & Passive Voice", "Direct & Indirect Speech", "Adjectives & Adverbs (advanced usage)", "Prepositions", "Conjunctions", "Determiners", "Subject-Verb Agreement"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Idioms & Phrases", "One-word Substitution", "Phrasal Verbs", "Collocations", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (literary & factual)", "Analytical & inferential questions", "Theme & tone identification", "Vocabulary-based questions"],
    "SECTION D : WRITING SKILLS": ["Paragraph writing", "Article writing", "Notice writing"],
    "SECTION E : EXCELLENCE ZONE": ["Word analogy", "Odd one out", "Coding-decoding", "Logical reasoning", "Mixed grammar application"],
  },
  "Class 9": {
    "SECTION A : GRAMMAR": ["Tenses (comprehensive)", "Modals (advanced usage)", "Active & Passive Voice", "Direct & Indirect Speech", "Clauses (noun, adjective, adverb)", "Determiners", "Prepositions", "Conjunctions", "Subject-Verb Agreement", "Sentence Transformation"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Idioms & Phrases", "One-word Substitution", "Phrasal Verbs", "Collocations", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (discursive, factual, literary)", "Analytical & inferential questions", "Author's tone & intent", "Vocabulary-based questions"],
    "SECTION D : WRITING SKILLS": ["Paragraph writing", "Article writing", "Story writing", "Letter writing (formal)", "Diary entry / short composition"],
    "SECTION E : EXCELLENCE ZONE": ["Word analogy", "Odd one out", "Coding-decoding", "Logical reasoning", "Mixed grammar application"],
  },
  "Class 10": {
    "SECTION A : GRAMMAR": ["Tenses (advanced usage and error detection)", "Modals", "Active & Passive Voice", "Direct & Indirect Speech (statements, questions, commands, exclamations)", "Clauses (noun, adjective, adverb — identification and transformation)", "Determiners (all types and contextual usage)", "Prepositions (advanced and idiomatic usage)", "Conjunctions", "Subject-Verb Agreement", "Sentence Transformation (simple, complex, compound; assertive, interrogative, exclamatory, imperative)"],
    "SECTION B : VOCABULARY": ["Synonyms & Antonyms", "Idioms & Phrases", "One-word Substitution", "Phrasal Verbs", "Collocations", "Word Formation (prefix, suffix, root words)", "Spelling Correction"],
    "SECTION C : READING AND COMPREHENSION": ["Unseen passages (discursive, literary, case-based)", "Analytical & inferential questions", "Author's tone, style & intent", "Vocabulary in context", "Summary-based questions"],
    "SECTION D : WRITING SKILLS": ["Article writing", "Formal letter writing (complaint, enquiry, application)", "Story writing (creative & reflective)", "Editing & Omission"],
    "SECTION E : EXCELLENCE ZONE": ["Word Analogy", "Odd one out (logical & linguistic)", "Coding-decoding (pattern-based & logical reasoning)", "Logical reasoning", "Mixed grammar application (error correction, editing passages)"],
  },
};

const CLASSES = Object.keys(SYLLABUS);

export default function Page() {
  const [openClass, setOpenClass] = useState(CLASSES[0]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
      <section className="border-b border-line pb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-soft px-4 py-2 text-sm font-bold text-brand">
          <BookOpen className="h-4 w-4" /> NextGen Olympiad
        </div>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
          English
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate">
          Class-wise English syllabus covering Grammar, Vocabulary, Reading &amp; Comprehension,
          Writing Skills and the Excellence Zone.
        </p>
      </section>

      {/* Class-wise accordion */}
      <section className="mt-8 flex flex-col gap-3">
        {CLASSES.map((c) => {
          const isOpen = openClass === c;
          const data = SYLLABUS[c];
          return (
            <div
              key={c}
              className={`rounded-2xl border border-line transition ${
                isOpen ? "bg-white shadow-soft" : "bg-slate-50/60"
              }`}
            >
              <button
                onClick={() => setOpenClass(isOpen ? null : c)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className={`font-display text-lg font-extrabold ${isOpen ? "text-brand" : "text-ink"}`}>
                  {c}
                </span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isOpen ? "bg-orange-500 text-white" : "bg-white text-slate ring-1 ring-line"
                  }`}
                >
                  {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="grid gap-8 border-t border-line px-5 py-5 md:grid-cols-2">
                  {Object.entries(data).map(([section, items]) => (
                    <div key={section}>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gold-dark">
                        {section}
                      </p>
                      <ul className="mt-2 list-disc pl-4 text-sm leading-relaxed text-slate">
                        {items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}