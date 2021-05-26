import React from 'react';
import PropTypes from 'prop-types';
import { ComponentFactory as LandingComponentFactory } from './landing';
import Step from './Step';
import Paragraph from './Paragraph';
import List from './List';
import ListItem from './ListItem';
import ListTable from './ListTable';
import Emphasis from './Emphasis';
import Include from './Include';
import Section from './Section';
import Code from './Code';
import LiteralInclude from './LiteralInclude';
import Tabs from './Tabs';
import Admonition, { admonitionMap } from './Admonition';
import Figure from './Figure';
import Literal from './Literal';
import Heading from './Heading';
import BlockQuote from './BlockQuote';
import Reference from './Reference';
import Strong from './Strong';
import URIWriter from './URIWriter/URIWriter';
import TitleReference from './TitleReference';
import Text from './Text';
import DefinitionList from './DefinitionList';
import DefinitionListItem from './DefinitionListItem';
import Transition from './Transition';
import CSSClass from './CSSClass';
import SubstitutionReference from './SubstitutionReference';
import Line from './Line';
import LineBlock from './LineBlock';
import HorizontalList from './HorizontalList';
import Container from './Container';
import Cond from './Cond';
import Meta from './Meta';
import VersionModified from './VersionModified';
import CardGroup from './CardGroup';
import Footnote from './Footnote';
import FootnoteReference from './FootnoteReference';
import LiteralBlock from './LiteralBlock';
import Topic from './Topic';
import Subscript from './Subscript';
import Superscript from './Superscript';
import Image from './Image';
import RefRole from './RefRole';
import Target from './Target';
import Glossary from './Glossary';
import Rubric from './Rubric';
import SearchResults from './SearchResults';
import Field from './Field';
import FieldList from './FieldList';
import Operation from './Operation';
import OpenAPI from './OpenAPI';
import Root from './Root';
import Steps from './Steps';
import MongoWebShell from './MongoWebShell';
import Extract from './Extract';
import Describe from './Describe';
import ReleaseSpecification from './ReleaseSpecification';
import Twitter from './Twitter';

import RoleAbbr from './Roles/Abbr';
import RoleClass from './Roles/Class';
import RoleCommand from './Roles/Command';
import RoleFile from './Roles/File';
import RoleGUILabel from './Roles/GUILabel';
import RoleHighlight from './Roles/Highlight';
import RoleIcon from './Roles/Icon';
import RoleKbd from './Roles/Kbd';
import RoleRed from './Roles/Red';
import RoleRequired from './Roles/Required';

const IGNORED_NAMES = new Set([
  'default-domain',
  'raw',
  'toctree',
  'tabs-pillstrip',
  'tabs-selector',
  'contents',
  'ia',
  'entry',
]);
const IGNORED_TYPES = new Set(['comment', 'substitution_definition', 'inline_target', 'named_reference']);
const DEPRECATED_ADMONITIONS = new Set(['admonition', 'topic', 'caution', 'danger']);

const roleMap = {
  abbr: RoleAbbr,
  class: RoleClass,
  command: RoleCommand,
  file: RoleFile,
  guilabel: RoleGUILabel,
  icon: RoleIcon,
  'highlight-blue': RoleHighlight,
  'highlight-green': RoleHighlight,
  'highlight-red': RoleHighlight,
  'highlight-yellow': RoleHighlight,
  'icon-fa5': RoleIcon,
  'icon-fa5-brands': RoleIcon,
  'icon-fa4': RoleIcon,
  'icon-mms': RoleIcon,
  'icon-charts': RoleIcon,
  kbd: RoleKbd,
  red: RoleRed,
  required: RoleRequired,
  sub: Subscript,
  subscript: Subscript,
  sup: Superscript,
  superscript: Superscript,
};

const componentMap = {
  admonition: Admonition,
  blockquote: BlockQuote,
  'card-group': CardGroup,
  class: CSSClass,
  code: Code,
  cond: Cond,
  container: Container,
  cssclass: CSSClass,
  definitionList: DefinitionList,
  definitionListItem: DefinitionListItem,
  deprecated: VersionModified,
  describe: Describe,
  emphasis: Emphasis,
  extract: Extract,
  field: Field,
  field_list: FieldList,
  figure: Figure,
  footnote: Footnote,
  footnote_reference: FootnoteReference,
  glossary: Glossary,
  heading: Heading,
  hlist: HorizontalList,
  image: Image,
  include: Include,
  line: Line,
  line_block: LineBlock,
  list: List,
  listItem: ListItem,
  'list-table': ListTable,
  literal: Literal,
  literal_block: LiteralBlock,
  literalinclude: LiteralInclude,
  meta: Meta,
  'mongo-web-shell': MongoWebShell,
  only: Cond,
  openapi: OpenAPI,
  operation: Operation,
  paragraph: Paragraph,
  ref_role: RefRole,
  reference: Reference,
  release_specification: ReleaseSpecification,
  root: Root,
  rubric: Rubric,
  'search-results': SearchResults,
  section: Section,
  step: Step,
  steps: Steps,
  strong: Strong,
  substitution_reference: SubstitutionReference,
  tabs: Tabs,
  target: Target,
  text: Text,
  title_reference: TitleReference,
  topic: Topic,
  transition: Transition,
  twitter: Twitter,
  uriwriter: URIWriter,
  versionadded: VersionModified,
  versionchanged: VersionModified,
};

const ComponentFactory = (props) => {
  const { nodeData, slug } = props;

  const selectComponent = () => {
    const { domain, name, type } = nodeData;

    if (IGNORED_TYPES.has(type) || IGNORED_NAMES.has(name)) {
      return null;
    }

    if (domain === 'landing') {
      return <LandingComponentFactory {...props} />;
    }

    const lookup = type === 'directive' ? name : type;
    let ComponentType = componentMap[lookup];

    if (type === 'role') {
      ComponentType = roleMap[name];
    }

    // Various admonition types are all handled by the Admonition component
    if (DEPRECATED_ADMONITIONS.has(name) || name in admonitionMap) {
      ComponentType = componentMap.admonition;
    }

    if (!ComponentType) {
      console.warn(`${type} ${name ? `"${name}" ` : ''}not yet implemented${slug ? ` on page ${slug}` : ''}`);
      return null;
    }

    return <ComponentType {...props} />;
  };

  if (!nodeData) return null;
  return selectComponent();
};

ComponentFactory.propTypes = {
  nodeData: PropTypes.shape({
    domain: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string.isRequired,
  }).isRequired,
  slug: PropTypes.string,
};

export default ComponentFactory;
