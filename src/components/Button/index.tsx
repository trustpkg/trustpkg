import {
  ButtonAsButtonComponent,
  ButtonAsAnchorComponent,
  ButtonAsNextLinkComponent,
  IconButtonAsButtonComponent,
  IconButtonAsAnchorComponent,
  IconButtonAsNextLinkComponent,
  LinkAsAnchorComponent,
  LinkAsNextLinkComponent,
  LinkAsButtonComponent,
} from "./Button";

interface ButtonComponentType {
  AsButton: typeof ButtonAsButtonComponent;
  AsAnchor: typeof ButtonAsAnchorComponent;
  AsNextLink: typeof ButtonAsNextLinkComponent;
}

const Button: ButtonComponentType = {
  AsButton: ButtonAsButtonComponent,
  AsAnchor: ButtonAsAnchorComponent,
  AsNextLink: ButtonAsNextLinkComponent,
};

interface IconButtonComponentType {
  AsButton: typeof IconButtonAsButtonComponent;
  AsAnchor: typeof IconButtonAsAnchorComponent;
  AsNextLink: typeof IconButtonAsNextLinkComponent;
}

const IconButton: IconButtonComponentType = {
  AsButton: IconButtonAsButtonComponent,
  AsAnchor: IconButtonAsAnchorComponent,
  AsNextLink: IconButtonAsNextLinkComponent,
};

interface LinkComponentType {
  AsAnchor: typeof LinkAsAnchorComponent;
  AsNextLink: typeof LinkAsNextLinkComponent;
  AsButton: typeof LinkAsButtonComponent;
}

const Link: LinkComponentType = {
  AsAnchor: LinkAsAnchorComponent,
  AsNextLink: LinkAsNextLinkComponent,
  AsButton: LinkAsButtonComponent,
};

export { Button, IconButton, Link };
