export default function Footer (){
    return(
        <footer className="bg-black text-white py-6 mt-8">
            <div className="contatinter mx-auto flex flex-col sm:flex-row justify-between items-center px-4 gap-4">
                <span className="font-bold">Däger {new Date().getFullYear()}</span>
                <div className="flex gap-4">
                    <a target="_blank" rel="noopener noreferrer" className="hover:text-pink-500" href="">Instagram</a>
                    <a target="_blank" rel="noopener noreferrer" className="hover:text-blue-400" href="">Facebook</a>
                    <a target="_blank" rel="noopener noreferrer" className="hover:text-blue-300" href="">Twitter</a>
                </div>
            </div>
        </footer>
    )
}