/**
 * @license
 * Copyright a-Qoot All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/a-Qoot/qoot/blob/main/LICENSE
 */

import { expect } from 'chai';
import { ElementFixture } from '../testing/element_fixture.js';
import '../testing/node_utils.js';
import { createGlobal } from '../testing/node_utils.js';
import { AttributeMarker } from '../util/markers.js';
import { getInjector } from './element_injector.js';
import { injectFunction } from './inject.js';
import { injectEventHandler } from './inject_event_handler.js';
import { Injector } from './types.js';

describe('inject', () => {
  const log: string[] = [];
  let injector: Injector;
  let element: Element;
  beforeEach(() => {
    log.length = 0;
    const global = createGlobal(import.meta.url);
    element = global.document.createElement('div');
    injector = getInjector(element);
  });

  it('should inject nothing', async () => {
    const injectedFn = injectFunction(() => log.push('invoked'));
    await injector.invoke(injectedFn);
    expect(log).to.eql(['invoked']);
  });

  it('should inject this', async () => {
    const injectedFn = injectFunction(
      () => 'arg0',
      function (this: any, arg0: string) {
        log.push(this, arg0, 'invoked');
        return 'return value';
      }
    );
    expect(await injector.invoke(injectedFn)).to.equal('return value');
    expect(log).to.eql([undefined, 'arg0', 'invoked']);
  });

  it('should inject async', async () => {
    const injectedFn = injectFunction(
      () => Promise.resolve('value'),
      function (value) {
        log.push(value, 'invoked');
        return Promise.resolve('return value');
      }
    );
    expect(await injector.invoke(injectedFn)).to.equal('return value');
    expect(log).to.eql(['value', 'invoked']);
  });
});

describe('injectEventHandler', async () => {
  const log: any[] = [];
  beforeEach(() => (log.length = 0));

  it('should inject this', async () => {
    class MyComp {
      static $templateQRL = './comp';
      $state = undefined;
      myComp: boolean = true;
      $materializeState() {}
    }
    const myComp = new MyComp();
    const injectedFn = injectEventHandler(
      MyComp,
      () => 'arg0',
      function (this: MyComp, arg0: string) {
        log.push(this, 'invoked', arg0);
        return 'return value';
      }
    );
    const event: Event = 'EVENT' as any;
    const fixture = new ElementFixture();
    const url: URL = new URL('file:///somepath');
    fixture.host.setAttribute(AttributeMarker.ComponentTemplate, './comp');
    expect(injectedFn(fixture.host, event, url)).to.equal(false);
    await 0; // needed for promises to resolve
    await 0;
    await 0;
    await 0;
    expect(log).to.eql([myComp, 'invoked', 'arg0']);
  });
});
