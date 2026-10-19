import {
    PageLayoutListDetailsHero, PageLayoutListDetailsRoot, PageLayoutListDetailsSection,
} from "./PageLayoutListDetails";

interface PageLayoutListDetailsSubcomponents {
    Hero: typeof PageLayoutListDetailsHero
    Section: typeof PageLayoutListDetailsSection
}

const PageLayoutListDetails = PageLayoutListDetailsRoot as typeof PageLayoutListDetailsRoot & PageLayoutListDetailsSubcomponents
PageLayoutListDetails.Hero = PageLayoutListDetailsHero
PageLayoutListDetails.Section = PageLayoutListDetailsSection

export default PageLayoutListDetails