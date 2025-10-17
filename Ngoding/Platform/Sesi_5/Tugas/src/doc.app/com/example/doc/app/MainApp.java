package com.example.doc.app;

import com.example.doc.core.DocumentProcessor;
import java.util.ServiceLoader;

public class MainApp {
    public static void main(String[] args) {
        System.out.println("Mencari implementasi DocumentProcessor yang tersedia...");

        ServiceLoader<DocumentProcessor> processors = ServiceLoader.load(DocumentProcessor.class);

        int count = 0;
        for (DocumentProcessor processor : processors) {
            count++;
            System.out.println("-> Ditemukan prosesor untuk format: " + processor.getFormatName());
            
            String sampleContent = "Ini adalah contoh konten dokumen.";
            String processedContent = processor.process(sampleContent);
            System.out.println(processedContent);
            System.out.println("---");
        }

        if (count == 0) {
            System.out.println("Tidak ada implementasi DocumentProcessor yang ditemukan.");
        }
    }
}