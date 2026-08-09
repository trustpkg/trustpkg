import { EcosystemsItem, EcosystemsRoot } from "./Ecosystems";

interface EcosystemsComponent {
  Item: typeof EcosystemsItem;
}

const Ecosystems = EcosystemsRoot as typeof EcosystemsRoot &
  EcosystemsComponent;

Ecosystems.Item = EcosystemsItem;

export default Ecosystems;
