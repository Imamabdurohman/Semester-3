package com.example.doc.txt;

import com.example.doc.core.DocumentProcessor;

public class PlainTextProcessor implements DocumentProcessor {

    @Override
    public String process(String content) {
        return "[PROCESSED AS PLAIN TEXT]:\n" + content;
    }

    @Override
    public String getFormatName() {
        return "Plain Text";
    }
}