import PageLayoutListDetails from "./components/PageLayoutListDetails";
import { PageLayoutListSideMenu } from "./components/PageLayoutListSideMenu/PageLayoutListSideMenu";
import { PageLayoutListRoot } from "./PageLayoutList";

interface PageLayoutListSubcomponents {
    SideMenu: typeof PageLayoutListSideMenu,
    Details: typeof PageLayoutListDetails
}

const PageLayoutList = PageLayoutListRoot as typeof PageLayoutListRoot & PageLayoutListSubcomponents
PageLayoutList.SideMenu = PageLayoutListSideMenu;
PageLayoutList.Details = PageLayoutListDetails;

export default PageLayoutList