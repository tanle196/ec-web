import { TopBanner } from "./TopBanner";
import { TopInfoBar } from "./TopInfoBar";
import { Logo } from "./Logo";
import { CategoryMenu } from "./CategoryMenu";
import { ProvinceButton } from "./ProvinceButton";
import { SearchBox } from "./SearchBox";
import { NotificationButton } from "./NotificationButton";
import { CartButton } from "./CartButton";
import { LoginButton } from "./LoginButton";
import styles from "./styles/cpsHeaderOutLine.module.css";

export function Header() {
  return (
    <header id="cpsHeader" className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBanner />
      <TopInfoBar />

      {/* Main Header */}
      <div id="cpsHeaderOutLine" className={styles.cpsHeaderOutLine}>
        <div id="mainHead" className="container mx-auto px-4">
          <nav className="cps-navbar flex h-14 items-center gap-3">
            <Logo />

            {/* Left actions: category + province */}
            <div className="flex items-center gap-1">
              <CategoryMenu />
              <ProvinceButton />
            </div>

            {/* Search — grows to fill available space */}
            <SearchBox />

            {/* Right actions: notification + cart + login */}
            <div className="flex items-center gap-1">
              <NotificationButton />
              <CartButton />
              <LoginButton />
            </div>
          </nav>
        </div>
      </div>

    </header>
  );
}
