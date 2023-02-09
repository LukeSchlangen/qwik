## API Report File for "@builder.io/qwik-city"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ServerAdapterOptions } from '../../shared/vite';
import type { StaticGenerateRenderOptions } from '@builder.io/qwik-city/static';

export { StaticGenerateRenderOptions }

// @alpha (undocumented)
export function vercelEdgeAdapter(opts?: VercelEdgeAdapterOptions): any;

// @alpha (undocumented)
export interface VercelEdgeAdapterOptions extends ServerAdapterOptions {
    outputConfig?: boolean;
    staticPaths?: string[];
    vcConfigEntryPoint?: string;
    vcConfigEnvVarsInUse?: string[];
}

// @alpha @deprecated (undocumented)
export const vercelEdgeAdaptor: typeof vercelEdgeAdapter;

// @alpha @deprecated (undocumented)
export type VercelEdgeAdaptorOptions = VercelEdgeAdapterOptions;

// (No @packageDocumentation comment for this package)

```