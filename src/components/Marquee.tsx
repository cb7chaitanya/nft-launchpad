import Marquee from "react-fast-marquee";
import Image from "./Image";

const VerticalMarquee = () => {
    const images = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQulq-UZv5LAWF4xzcWsfGNvX9AuJj9vhkod1FA73B1aOEJ7dLxxpaFX1L_LQlpSYfpaw&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMJ8FZkrMXKFxyij0d9jfaN5G61RBbBdtYow&s', 'https://www.paradigm.xyz/static/phantom-logo-400x400.png', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5OmRn4sb61DatGqfLXvMpD9fIcpCsrrVVYPfRnb2W6x-BjAezpJlPNCeUPBCo44T1Dw&usqp=CAU', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQulq-UZv5LAWF4xzcWsfGNvX9AuJj9vhkod1FA73B1aOEJ7dLxxpaFX1L_LQlpSYfpaw&usqp=CAU', 'https://moralis.io/wp-content/uploads/web3wiki/1143-backpack/637e9daf153a2754abcc009a_sHbxz6MzKXH9PL_ddvDDEibZ-h7_y5c8usVwoN982uI.jpeg']
  return (
    <div className="text-white flex ">
        <Marquee direction="up">
            {images.map((image, index) => (
                <Image src={image} key={index} />
            ))}
        </Marquee>
    </div>
  )
}

export default VerticalMarquee