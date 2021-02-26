import { GenericForm } from '@mtutils/genericform';
import { Jsve } from '@mtutils/jsve';
import { Nlp } from '@mtutils/nlp';
import { SortableTree } from '@mtutils/sortabletree';
import React from 'react';

export default { title: '@mtutils' };

export const jsve = () => <Jsve />;
export const genericForm = () => <GenericForm />;
export const nlp = () => <Nlp />;
export const sortableTree = () => <SortableTree />;
