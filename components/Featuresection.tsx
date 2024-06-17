"use client";
import React from "react";
import { SearchCheck,Files,User } from "lucide-react";

export default function FeatureSection() {



    return(

        <>

<div className="container py-24 lg:py-32">
        <div className="max-w-2xl mx-auto">
          {/* Grid */}
          <div className="grid gap-12">
            <div>
              <h2 className="text-3xl font-bold lg:text-4xl">Benefits of Using DocumentAI</h2>
              <p className="mt-3 text-muted-foreground">
              Efficient document management is crucial in today’s fast-paced business environment. DocumentAI empowers you to extract and analyze data from various document formats seamlessly, enhancing productivity and accuracy while keeping your information secure and organized.
              </p>
            </div>
            <div className="space-y-6 lg:space-y-10">
             
              <div className="flex">
                <SearchCheck className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                  Enhance Accuracy
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  By utilizing advanced AI technology, DocumentAI minimizes errors and ensures precise data extraction, providing you with reliable and consistent results.
                  </p>
                </div>
              </div>
             
              <div className="flex">
                <Files className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                  Multi-Format Compatibility
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  DocumentAI supports a wide range of document formats, including PDFs and Excel files, providing you with the flexibility to work with various types of documents seamlessly.
                  </p>
                </div>
              </div>
             
              <div className="flex">
                <User className="flex-shrink-0 mt-2 h-6 w-6" />
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                  User-Friendly Interface
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Our intuitive design ensures that users of all technical skill levels can easily navigate and utilize the platform, making document management effortless.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
        
        
        </>
    )



};