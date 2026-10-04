import PageLayoutListDetails from "./components/PageLayoutListDetails";
import { PageLayoutListSideMenu } from "./components/PageLayoutListSideMenu/PageLayoutListSideMenu";
import { PageLayoutListRoot } from "./PageLayoutList";
import { PageLayoutListSideMenuProvider, PageLayoutListSideMenuContext } from "./components/PageLayoutListSideMenu/PageLayoutListSideMenu.provider";
import { PageLayoutListSideMenuAction } from "./components/PageLayoutListSideMenu/PageLayoutListSideMenuAction.client";

interface PageLayoutListSubcomponents {
    SideMenu: typeof PageLayoutListSideMenu,
    Details: typeof PageLayoutListDetails
}

const PageLayoutList = PageLayoutListRoot as typeof PageLayoutListRoot & PageLayoutListSubcomponents
PageLayoutList.SideMenu = PageLayoutListSideMenu;
PageLayoutList.Details = PageLayoutListDetails;

export default PageLayoutList
export { PageLayoutListSideMenuProvider, PageLayoutListSideMenuContext, PageLayoutListSideMenuAction }