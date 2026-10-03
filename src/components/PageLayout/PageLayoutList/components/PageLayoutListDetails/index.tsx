import { PageLayoutListDetailsHero, PageLayoutListDetailsRoot } from "./PageLayoutListDetails";

interface PageLayoutListDetailsSubcomponents {
    Hero: typeof PageLayoutListDetailsHero
}

const PageLayoutListDetails = PageLayoutListDetailsRoot as typeof PageLayoutListDetailsRoot & PageLayoutListDetailsSubcomponents
PageLayoutListDetails.Hero = PageLayoutListDetailsHero

export default PageLayoutListDetails