const categoryInput = document.querySelector("#category");
const companyInput = document.querySelector("#company");
const budgetInput = document.querySelector("#budget");
const colorInput = document.querySelector("#color");

const outputBox = document.querySelector(".output-box");
const submitBtn = document.querySelector(".submit-btn");

const apiKey = "AIzaSyC1LaLWkO8agJmXxar9ffUtJEh86PxucSo";

const electronic = async (e) => {
  e.preventDefault();
  outputBox.innerHTML = "Processing...";

  const category = categoryInput.value;
  const company = companyInput.value;
  const budget = budgetInput.value;
  const color = colorInput.value || "any color";
  const response = await fetch(
    "https:generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
                     You are an expert in electronics. 
                     Return the output ONLY in CLEAN, STRUCTURED HTML using <h3>, <ul>, <li>, <strong>. 
                     DO NOT return paragraphs. 
                     DO NOT wrap in <html>, <body>, or <code>. Only return pure HTML.

                     User Input:
                     - Category: ${category}
                     - Company: ${company}
                     - Budget: ₹${budget}
                     - Preferred Color: ${color}

                     Your Task:
                     1. Identify the exact device model or closest match.
                     2. Output must be STRICTLY formatted using HTML like this:

                     <h3>Device Overview</h3>
                     <ul>
                     <li><strong>Full Name:</strong> ...</li>
                     <li><strong>Brand:</strong> ...</li>
                     <li><strong>Category:</strong> ...</li>
                     <li><strong>Year Launched:</strong> ...</li>
                     </ul>

                     <h3>Specifications</h3>
                     <ul>
                     <li><strong>Display:</strong> ...</li>
                     <li><strong>Processor:</strong> ...</li>
                     <li><strong>RAM / Storage:</strong> ...</li>
                     <li><strong>Battery:</strong> ...</li>
                     <li><strong>Camera:</strong> ...</li>
                     <li><strong>OS:</strong> ...</li>
                     <li><strong>Special Features:</strong> ...</li>
                     </ul>

                     <h3>Available Colors</h3>
                     <ul>
                     <li><strong>Official Colors:</strong> ...</li>
                     <li><strong>User Preferred Color Available:</strong> Yes/No</li>
                     </ul>

                     <h3>Price Details</h3>
                     <ul>
                     <li><strong>Launch Price:</strong> ...</li>
                     <li><strong>Current Price:</strong> ...</li>
                     <li><strong>Budget Fit:</strong> Fits / Does Not Fit</li>
                     </ul>

                     <h3>Alternatives Within Budget</h3>
                     <ul>
                     <li>Option 1: ...</li>
                     <li>Option 2: ...</li>
                     </ul>

                     <h3>Final Recommendation</h3>
                     <ul>
                     <li><strong>Best Use Case:</strong> ...</li>
                     <li><strong>Pro:</strong> ...</li>
                     <li><strong>Con:</strong> ...</li>
                     </ul>

                     RULES:
                     - Output only HTML lists and headings.
                     - No paragraphs. No raw text outside <ul>/<li>.
                     - Keep sentences short, clear, factual.
                     - Do NOT use Markdown stars (**). Use <strong>.
                     `,
              },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!data.candidates) {
    outputBox.innerHTML = "AI is busy. Please try again in a moment.";
    console.error(data);
    return;
  }

  outputBox.innerHTML = data.candidates[0].content.parts[0].text;

  // const response = await fetch(
  //   "https:generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
  //   {
  //     method: "POST",
  //     headers: {
  //       "x-goog-api-key": apiKey,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       contents: [
  //         {
  //           parts: [
  //             {
  //               text: `
  //                    You are an expert in electronics.
  //                    Return the output ONLY in CLEAN, STRUCTURED HTML using <h3>, <ul>, <li>, <strong>.
  //                    DO NOT return paragraphs.
  //                    DO NOT wrap in <html>, <body>, or <code>. Only return pure HTML.

  //                    User Input:
  //                    - Category: ${category}
  //                    - Company: ${company}
  //                    - Budget: ₹${budget}
  //                    - Preferred Color: ${color}

  //                    Your Task:
  //                    1. Identify the exact device model or closest match.
  //                    2. Output must be STRICTLY formatted using HTML like this:

  //                    <h3>Device Overview</h3>
  //                    <ul>
  //                    <li><strong>Full Name:</strong> ...</li>
  //                    <li><strong>Brand:</strong> ...</li>
  //                    <li><strong>Category:</strong> ...</li>
  //                    <li><strong>Year Launched:</strong> ...</li>
  //                    </ul>

  //                    <h3>Specifications</h3>
  //                    <ul>
  //                    <li><strong>Display:</strong> ...</li>
  //                    <li><strong>Processor:</strong> ...</li>
  //                    <li><strong>RAM / Storage:</strong> ...</li>
  //                    <li><strong>Battery:</strong> ...</li>
  //                    <li><strong>Camera:</strong> ...</li>
  //                    <li><strong>OS:</strong> ...</li>
  //                    <li><strong>Special Features:</strong> ...</li>
  //                    </ul>

  //                    <h3>Available Colors</h3>
  //                    <ul>
  //                    <li><strong>Official Colors:</strong> ...</li>
  //                    <li><strong>User Preferred Color Available:</strong> Yes/No</li>
  //                    </ul>

  //                    <h3>Price Details</h3>
  //                    <ul>
  //                    <li><strong>Launch Price:</strong> ...</li>
  //                    <li><strong>Current Price:</strong> ...</li>
  //                    <li><strong>Budget Fit:</strong> Fits / Does Not Fit</li>
  //                    </ul>

  //                    <h3>Alternatives Within Budget</h3>
  //                    <ul>
  //                    <li>Option 1: ...</li>
  //                    <li>Option 2: ...</li>
  //                    </ul>

  //                    <h3>Final Recommendation</h3>
  //                    <ul>
  //                    <li><strong>Best Use Case:</strong> ...</li>
  //                    <li><strong>Pro:</strong> ...</li>
  //                    <li><strong>Con:</strong> ...</li>
  //                    </ul>

  //                    RULES:
  //                    - Output only HTML lists and headings.
  //                    - No paragraphs. No raw text outside <ul>/<li>.
  //                    - Keep sentences short, clear, factual.
  //                    - Do NOT use Markdown stars (**). Use <strong>.
  //                    `,
  //             },
  //           ],
  //         },
  //       ],
  //     }),
  //   }
  // );

  // const data = await response.json();

  // outputBox.innerHTML = data.candidates[0].content.parts[0].text;
};

submitBtn.addEventListener("click", electronic);
