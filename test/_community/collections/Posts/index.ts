import type { CollectionConfig } from '../../../../packages/payload/src/collections/config/types'

import { mediaSlug } from '../Media'

export const postsSlug = 'posts'

export const PostsCollection: CollectionConfig = {
  admin: {
    useAsTitle: 'text',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'text',
      type: 'text',
    },
    {
      name: 'associatedMedia',
      access: {
        create: () => true,
        update: () => false,
      },
      relationTo: mediaSlug,
      type: 'upload',
    },
    {
      name: 'relatedPosts',
      relationTo: postsSlug,
      type: 'relationship',
      filterOptions: ({ id }) => {
        return {
          id: { not_equals: id },
          and: [
            {
              _status: { equals: 'published' },
            },
          ],
        }
      },
    },
  ],
  slug: postsSlug,
}
