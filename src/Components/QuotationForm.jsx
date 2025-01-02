import React, { useRef } from "react";
import { jsPDF } from 'jspdf';


const QuotationForm = () => {
  const printRef = useRef(); // Create a reference to the form to be 
  const formRef = useRef();

 
  const generatePDF = () => {
    const doc = new jsPDF();
    const margin = 10; // Set the margin for top, left, right, and bottom
    const pageWidth = doc.internal.pageSize.width;  // Width of the page
  
    // This will print the content of the form starting at x = 10 and y = 10
    doc.html(formRef.current, {
      callback: (doc) => {
        doc.save('form.pdf'); // Save the document after printing
      },
      x: margin, // Horizontal position of the content
      y: margin, // Vertical position of the content (starts from top margin)
      width: pageWidth - 2 * margin, // Adjust the width to respect the left and right margins
      windowWidth: 800, // Ensure that the window size allows the content to be properly loaded
    });
  };
  

  return (
    <div className="p-6 bg-gray-100">
      <div ref={formRef} className="container mx-auto space-y-6" >
        {/* Section 1: Customer Details Form */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#1A2067] p-6 rounded shadow-md">
            <h2 className="text-xl font-bold text-white mb-4">
              Customer Details
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium text-white ">
                  Company Name
                </label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">
                  Attention (Contact Person)
                </label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">Address</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">Tel</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">Email</label>
                <input type="email" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">Sales</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">
                  Tel (upto two numbers)
                </label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">
                  Email (upto two email IDs)
                </label>
                <input type="email" className="w-full p-2 border rounded" />
              </div>
            </form>
          </div>
          <div className="bg-[#1A2067] p-6 rounded shadow-md">
            <h2 className="text-xl font-bold text-white mb-4">Other Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium text-white">Incoterm</label>
                <select className="w-full p-2 border rounded">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
              <div>
                <label className="block font-medium text-white">
                  Commodity
                </label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-medium text-white">
                  Dimension (W D H)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    placeholder="W"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="D"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="H"
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block font-medium text-white">Weight</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
            </form>
          </div>
        </div>

        {/* Section 2: Sea Freight Export Charge */}
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-xl font-bold text-[#2A388F] mb-4">
            Sea Freight Export Charge
          </h2>
          <p className="text-[#ED1C24] font-semibold mb-2">
            Sea Export to Jakarta, Indonesia
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="font-medium">Port of Loading: xxx</p>
              <p className="font-medium">Place of Loading: xxx</p>
            </div>
            <div>
              <p className="font-medium">Port of Discharge: xxx</p>
              <p className="font-medium">Place of Delivery: xxx</p>
            </div>
          </div>

          {/* Freight Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full table-auto border text-sm">
              <thead>
                <tr className="bg-[#2A388F] text-white">
                  <th className="py-2 px-4">Freight Charge (Container)</th>
                  <th>20'</th>
                  <th>40'</th>
                  <th>40'hc</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody>
                {["OOCL", "KMTC", "ONE"].map((carrier) => (
                  <tr key={carrier} className="text-center">
                    <td className="py-2 px-4 border">{carrier}</td>
                    <td className="border">USD100</td>
                    <td className="border">USD100</td>
                    <td className="border">USD100</td>
                    <td className="border">
                      Cut Off: Fri/Wed, ETD: Wed/Fri, T/T (Days): 11
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Local Charge Table */}
          <div className="mt-4">
            <h3 className="font-bold text-[#1A2067]">Local Charge</h3>
            <div className="overflow-x-auto mt-2">
              <table className="w-full table-auto border text-sm">
                <thead>
                  <tr className="bg-[#1A2067] text-white">
                    <th className="py-2 px-4">Description</th>
                    <th>20'</th>
                    <th>40'</th>
                    <th>40'hc</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">AMS</td>
                    <td className="border">USD30/SET</td>
                    <td className="border">USD30/SET</td>
                    <td className="border">
                      USD30/SET BKK-HKG TRUCK TO SHENZHEN
                    </td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Surrendered B/L</td>
                    <td className="border">THB1,200/SET</td>
                    <td className="border">THB1,200/SET</td>
                    <td className="border">THB1,200/SET</td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Customs Clearance</td>
                    <td className="border">THB2,000/ENTRY</td>
                    <td className="border">THB2,000/ENTRY</td>
                    <td className="border">THB2,000/ENTRY</td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Transport</td>
                    <td className="border">THB3,300/4WHEELS</td>
                    <td className="border">THB3,300/4WHEELS</td>
                    <td className="border">THB3,300/4WHEELS Rayong to PAT</td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Transport</td>
                    <td className="border">THB5,800/6WHEELS</td>
                    <td className="border">THB5,800/6WHEELS</td>
                    <td className="border">THB5,800/6WHEELS Rayong to PAT</td>
                    <td className="border"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Custom & Transport Table */}
            <h3 className="font-bold text-[#1A2067] mt-4">
              Custom & Transport
            </h3>
            <div className="overflow-x-auto mt-2">
              <table className="w-full table-auto border text-sm">
                <thead>
                  <tr className="bg-[#1A2067] text-white">
                    <th className="py-2 px-4">Description</th>
                    <th>20'</th>
                    <th>40'</th>
                    <th>40'hc</th>
                    <th>Remark</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Customs Clearance</td>
                    <td className="border">THB1,600/ENTRY</td>
                    <td className="border">THB1,600/ENTRY</td>
                    <td className="border">
                      THB1,600/ENTRY Next Cont will plus THB 1,000/Cont
                    </td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Transport Charge</td>
                    <td className="border">THB4,500/Cont</td>
                    <td className="border">THB4,500/Cont</td>
                    <td className="border">
                      THB4,500/Cont Alliance Laundry - LCB Port
                    </td>
                    <td className="border"></td>
                  </tr>
                  <tr className="text-center">
                    <td className="py-2 px-4 border">Other Charge</td>
                    <td className="border">As per receipt</td>
                    <td className="border">As per receipt</td>
                    <td className="border">As per receipt</td>
                    <td className="border"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*Section 3: Conditions and Sign*/}
        <div className="bg-white p-6 rounded shadow-md mt-6">
          <h3 className="text-lg font-bold text-[#2A388F] mb-4">
            CONDITIONS :
          </h3>
          <ul
            className="text-sm mb-4 list-disc pl-6"
            style={{ textAlign: "left" }}
          >
            <li>All above charges are exclusive of Insurance, Courier fee.</li>
            <li>
              All above charges are subject to change local charges by shipping
              line.
            </li>
            <li>Applicable to general commercial cargo only.</li>
            <li>All above charges are subject to Extra work at cost.</li>
            <li>All above charges are subject to VAT 7%.</li>
          </ul>
          <h3 className="text-lg font-bold text-[#2A388F] mb-4">
            Term & Condition (Freight, Local charge, Customs clearance,
            Transportation)
          </h3>
          <div className="text-sm" style={{ textAlign: "left" }}>
            <p>
              <strong>Credit Term:</strong> 30 Days
            </p>
            <p>
              <strong>Billing Acceptance:</strong> Payment :-
            </p>
            <p>
              <strong>Term & Condition (Import duty & Tax)</strong>
            </p>
            <p>
              <strong>Credit Term:</strong> -
            </p>
            <p>
              <strong>Limited Amount:</strong> -
            </p>
            <p>
              <strong>Credit Line Limit:</strong> -
            </p>
            <p>
              <strong>Weekly Statement:</strong> -
            </p>
            <p>
              <strong>Payment:</strong> -
            </p>
          </div>
          <p className="mt-4 text-sm">
            If you accept our quotation purpose, would you please sign your
            signature for approval and send us back accordingly.
          </p>
          <p className="mt-6 font-bold">Thanks and best regards,</p>
          <div className="mt-6">
            <p className="font-bold">WICE Logistics Public Company Limited</p>
            <div className="mt-4">
              {/* <label
                htmlFor="digital-signature"
                className="block text-sm font-medium text-gray-700"
              >
                Digital Signature
              </label> */}
              <div className="border border-gray-300 rounded-md mt-2 w-full h-24 bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">Sign here...</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p className="font-bold">Alliance Laundry (Thailand) Co., Ltd.</p>
            <div className="border border-gray-300 rounded-md mt-2 w-full h-24 bg-gray-100 flex items-center justify-center">
              <p className="text-gray-400">Sign here...</p>
            </div>
          </div>
        </div>
        {/* Print Button */}
        <button style={{backgroundColor: '#ED1C24'}} onClick={generatePDF} className="bg-[#ED1C24] text-white py-2 px-6 rounded-[10px] hover:bg-[#d91c1f]">Print PDF</button>
      </div>
    </div>
  );
};

export default QuotationForm;
