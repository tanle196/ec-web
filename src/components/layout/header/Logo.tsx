import Link from "next/link";
import Image from "next/image";
import LogoPCImage from './assets/Logo_CPS.webp';
import LogoSPImage from './assets/Logo-CPS-m.webp';

export function Logo() {
  return (
    <Link href="/" className="navbar__item flex-shrink-0">
      {/* Desktop logo */}
      <div className="hidden md:block">
        <Image src={LogoPCImage.src} alt="CellphoneS" width={148} height={40} priority />
      </div>
      {/* Mobile logo */}
      <div className="block md:hidden">
        <Image src={LogoSPImage.src} alt="CellphoneS" width={36} height={36} priority />
      </div>
    </Link>
  );
}
