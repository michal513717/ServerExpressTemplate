import { Collection } from "../common/common.collections.config";

class ManagersCollection extends Collection {};
class ControllersCollection extends Collection {};

export const managersCollection = new ManagersCollection();
export const controllersCollection = new ControllersCollection();