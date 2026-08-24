import {
  IconAsanaOrbits,
  IconChatCircles,
  IconCloudDoc,
  IconEnvelopeChimp,
  IconGameController,
  IconOctagonKnot,
  IconPenNib,
  IconStackedSquares,
  IconStripeCard,
  IconTrelloBoard,
  IconTriangleDrop,
  IconVideoCamera,
} from '../../../assets/brand-icons';

export type AppIntegration = {
  id: string;
  name: string;
  descriptionKey: string;
  icon: typeof IconChatCircles;
  connected: boolean;
};

export const apps: AppIntegration[] = [
  {
    id: 'team-chat',
    name: 'TeamChat',
    descriptionKey: 'teamChat',
    icon: IconChatCircles,
    connected: true,
  },
  {
    id: 'code-hub',
    name: 'CodeHub',
    descriptionKey: 'codeHub',
    icon: IconOctagonKnot,
    connected: true,
  },
  {
    id: 'notekeeper',
    name: 'NoteKeeper',
    descriptionKey: 'notekeeper',
    icon: IconStackedSquares,
    connected: false,
  },
  {
    id: 'designly',
    name: 'Designly',
    descriptionKey: 'designly',
    icon: IconPenNib,
    connected: false,
  },
  {
    id: 'filedrop',
    name: 'FileDrop',
    descriptionKey: 'filedrop',
    icon: IconTriangleDrop,
    connected: true,
  },
  {
    id: 'taskboard',
    name: 'TaskBoard',
    descriptionKey: 'taskboard',
    icon: IconTrelloBoard,
    connected: false,
  },
  {
    id: 'projecthub',
    name: 'ProjectHub',
    descriptionKey: 'projecthub',
    icon: IconAsanaOrbits,
    connected: false,
  },
  {
    id: 'meetup',
    name: 'MeetUp Video',
    descriptionKey: 'meetup',
    icon: IconVideoCamera,
    connected: true,
  },
  {
    id: 'payflow',
    name: 'PayFlow',
    descriptionKey: 'payflow',
    icon: IconStripeCard,
    connected: false,
  },
  {
    id: 'mailblast',
    name: 'MailBlast',
    descriptionKey: 'mailblast',
    icon: IconEnvelopeChimp,
    connected: false,
  },
  {
    id: 'communitycord',
    name: 'CommunityCord',
    descriptionKey: 'communitycord',
    icon: IconGameController,
    connected: false,
  },
  {
    id: 'clouddocs',
    name: 'CloudDocs',
    descriptionKey: 'clouddocs',
    icon: IconCloudDoc,
    connected: true,
  },
];
