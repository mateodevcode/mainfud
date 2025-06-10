import Image from "next/image";

const Logo = () => {
  return (
    <Image
      src={"/logo/logo.png"}
      alt="Logo"
      width={400}
      height={400}
      className="h-16 md:h-40 w-auto border-4 border-white rounded-full bg-white"
    />
  );
};

export default Logo;
