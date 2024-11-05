
export default function page({params}: any) {
  return (
    <div 
    className="flex flex-col items-center justify-center min-h-screen py-2">
        <h2 className="">Profile</h2>
        <h3 className="p-3 bg-green-500 rounded text-black">{params.id}</h3>
    </div>
  )
}

