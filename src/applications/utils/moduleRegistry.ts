import { RouteObjectWithMeta } from '@app/contracts/types.contract';

export interface ModuleDefinition {
  name: string;
  routes: RouteObjectWithMeta[];
  init?: (context: ModuleContext) => void | Promise<void>;
}

export interface ModuleContext {
  getAccessToken: () => string | null;
  logout: () => void;
}

class ModuleRegistry {
  private modules: Map<string, ModuleDefinition> = new Map();

  registerLocalModule(name: string, module: ModuleDefinition): void {
    if (this.modules.has(name)) {
      console.warn(`Module ${name} is already registered`);
      return;
    }
    this.modules.set(name, module);
  }

  getAllRoutes(): RouteObjectWithMeta[] {
    const routes: RouteObjectWithMeta[] = [];
    this.modules.forEach((module) => {
      routes.push(...module.routes);
    });
    return routes;
  }

  getModule(name: string): ModuleDefinition | undefined {
    return this.modules.get(name);
  }

  getAllModules(): ModuleDefinition[] {
    return Array.from(this.modules.values());
  }
}

export const moduleRegistry = new ModuleRegistry();
