"use client";
import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import axios from 'axios';

const ExcelViewer = ({ excelUrl} :{excelUrl:string}) => {
  const [data, setData] = useState<Array<{ [key: string]: string | number }>>([]);

  useEffect( () => {

  
    const fetchData = async () => {
      
      const response = await fetch(excelUrl);
  
    
    const blob = await response.blob();
    const data = await blob.arrayBuffer();
   
    const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });

    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet);
    console.log(rows);
    setData(rows);
   
    

     
    };
  
    fetchData();

  }, [excelUrl]);

  return (
  <>
{data.length > 0 && (
 
 <div className="flex flex-col overflow-auto">
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
              {Object.keys(data[0]).map((key, index) => (
                <th key={index} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {key}
                </th>
              ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, valueIndex) => (
                  <td key={valueIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>

  
  
)}



  
 
  
  </>
  );
};

export default ExcelViewer;