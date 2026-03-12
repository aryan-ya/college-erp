"use client"

import { useEffect, useState } from "react"

export default function FacultySubmissions(){

const [submissions,setSubmissions] = useState([])

useEffect(()=>{

fetch("/api/faculty/submissions")
.then(res=>res.json())
.then(data=>setSubmissions(data))

},[])

return(

<div className="p-6">

<h1 className="text-2xl font-bold mb-6">
Assignment Submissions
</h1>

<div className="space-y-4">

{submissions.map(sub => (

<div key={sub.id} className="border p-4 rounded">

<p className="font-semibold">{sub.studentName}</p>
<p className="text-sm text-gray-500">{sub.rollNo}</p>

<p className="text-sm mt-2">
File: {sub.file}
</p>

<p className="text-sm">
Status: {sub.status}
</p>

</div>

))}

</div>

</div>

)

}