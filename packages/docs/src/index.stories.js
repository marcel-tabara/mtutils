import { GenericForm } from '@mtutils/genericform';
import { Jsve } from '@mtutils/jsve';
import { Nlp } from '@mtutils/nlp';
import { DndTree } from '@mtutils/dndtree';
import React from 'react';

export default { title: '@mtutils' };

export const jsve = () => <Jsve />;
export const genericForm = () => <GenericForm />;
export const nlp = () => <Nlp />;
export const dndTree = () => <DndTree />;
