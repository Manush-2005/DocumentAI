import {
    FileSearch2,
    FilePlus2,
    Brain,
  } from "lucide-react";
  
  export default function IconSectionDescriptionOnLeftIconBlocksOnRight() {
    return (
      <>
        {/* Icon Blocks */}
        <div className="container py-24 lg:py-32">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                How Does It Work?
              </h2>
              <p className="mt-3 text-muted-foreground">
               Understand how DocumentAI Works:
              </p>
            
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <FilePlus2 className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                  Step 1 - Document Processing and Vectorization
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Our platform begins by taking your document and splitting it into smaller, manageable sections. Each section is then converted into vectors, capturing the essential data and context.
                  </p>
                </div>
              </div>
            
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border  bg-primary text-primary-foreground">
                  <FileSearch2 className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                   Step 2 -Query Vectorization and Matching
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  When you input a query, DocumentAI converts it into a vector format. This query vector is then compared against the stored document vectors to find the most relevant sections.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border bg-primary text-primary-foreground">
                  <Brain className="flex-shrink-0 w-5 h-5" />
                </span>
                <div className="ms-5 sm:ms-8">
                  <h3 className="text-base sm:text-lg font-semibold">
                   Step 3 - AI-Powered Results
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                  Using Gemini AI, DocumentAI analyzes the matched vectors to generate precise and insightful responses, providing you with the information you need swiftly and accurately.
                  </p>
                </div>
              </div>
            
            </div>
          
          </div>
        
        </div>
       
      </>
    );
  }