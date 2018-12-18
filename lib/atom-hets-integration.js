"use babel";

import AtomHetsIntegrationView from "./atom-hets-integration-view";
import { CompositeDisposable, Disposable } from "atom";

export class AtomHetsIntegration {

  constructor() {
    this.subscriptions = null;
    this.view = new AtomHetsIntegrationView();
  }
  
  activate() {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.workspace.addOpener(uri => {
        if (uri === "atom://atom-hets-integration-display-graph") {
          return this.view.showGraph();
        }
      })
    );

    this.subscriptions.add(
      atom.commands.add("atom-workspace", {
        "atom-hets-integration:toggle": () => this.toggle()
      })
    );

    this.subscriptions.add(
      new Disposable(() => {
        atom.workspace.getPaneItems().forEeach(item => {
          if (item instanceof AtomHetsIntegrationView) {
            item.destroy();
          }
        });
      })
    );
  }

  deactivate() {
    this.subscriptions.dispose();
  }

  toggle() {
    atom.workspace.toggle("atom://atom-hets-integration-display-graph");
  }

  deserializeAtomHetsIntegrationView() {
    return new AtomHetsIntegrationView();
  }
}
