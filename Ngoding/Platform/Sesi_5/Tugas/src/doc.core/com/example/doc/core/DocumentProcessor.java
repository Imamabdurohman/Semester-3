package com.example.doc.core;

public interface DocumentProcessor {
    String process(String content);
    String getFormatName();
}