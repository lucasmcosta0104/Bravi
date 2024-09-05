export interface MenuItem {
  id?: string;
  icon?: string;
  title: string;
  children?: MenuItem[];
  link?: string;
}

export const itemsMenu: MenuItem[] = [

  {
    id: 'Pessoas e Contatos',
    icon: 'people',
    title: 'Pessoas',
    children: [
      {
        id: 'perssoas',
        link: '/pessoa',
        title: 'Pessoas',
      },
      {
        id: 'contatos',
        link: '/contato',
        title: 'Contatos',
      },
    ],
  },
];
