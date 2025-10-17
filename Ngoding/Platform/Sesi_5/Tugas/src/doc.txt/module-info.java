module doc.txt {
    requires doc.core;
    provides com.example.doc.core.DocumentProcessor with com.example.doc.txt.PlainTextProcessor;
}