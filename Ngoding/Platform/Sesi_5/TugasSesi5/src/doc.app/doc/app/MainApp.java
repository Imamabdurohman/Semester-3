package doc.app;

import doc.core.Document;
import doc.text.PlainTextProcessor;
import doc.html.HtmlDocumentProcessor;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("🚀 Sistem Pengolah Dokumen Modular\n");

        Document textDoc = new Document("Ini adalah isi dokumen teks biasa.", "text");
        Document htmlDoc = new Document("Halo Dunia dari HTML!", "html");

        PlainTextProcessor textProcessor = new PlainTextProcessor();
        HtmlDocumentProcessor htmlProcessor = new HtmlDocumentProcessor();

        textProcessor.process(textDoc);
        System.out.println();
        htmlProcessor.process(htmlDoc);
    }
}
