import Link from "next/link";
import RemoveBtn from "./RemoveBtn"
import {HiPencilArt} from "react-icons/hi";
import { icons } from "react-icons";
import { FaBeer } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';



export default function TopicsList()
{
    return (
    <>
    <div className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start">
        <div>
            <h2 className="font-bold text-2xl">
                Topic Title
            </h2>
            <div>
                Topic Description
            </div>
            </div>
            <div className="flex gap-2"> 
                <RemoveBtn/>
                <Link href={"/editTopic/123"}>
                    {/* <HiPencilArt size={24}/> */}
                    <FaStar size={24}/>
                </Link>

            </div>

       

    </div>
    </>
    );
}