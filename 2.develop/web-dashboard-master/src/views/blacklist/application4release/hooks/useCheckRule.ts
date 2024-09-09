import { h } from 'vue';
import { type Api } from '@form-create/ant-design-vue';

// Use new URL to dynamically resolve the image path
const logoSrc = new URL('https://aliyuncdn.antdv.com/logo.png', import.meta.url).href;//@/assets/images/logo.png

export default function (record: any, fApi: Ref<Api>) {
  return [
    {
      type: 'input',
      field: 'reason',
      title: '解禁理由',
      value: '',
      props: {
        placeholder: '解禁理由',
        type: 'textarea',
        editable: false,
      },
    },
    {
      type: 'render',
      field: 'logoRow',
      title: '证据图片',
      render: () => {
        // Use h() function to create the div and img elements
        return h('div', {
          style: {
            display: 'flex', // Flexbox for layout
            justifyContent: 'space-between', // Space between each image
            marginTop: '20px',
            alignItems: 'center' // Vertically align images
          }
        }, [
          // First Image
          h('img', {
            attrs: {
              src: logoSrc, // Image source
              alt: '图片1'
            },
            style: {
              width: '100px', // Image width
              height: 'auto'
            }
          }),
          // Second Image
          h('img', {
            attrs: {
              src: logoSrc, // Image source
              alt: '图片2'
            },
            style: {
              width: '100px', // Image width
              height: 'auto'
            }
          }),
          // Third Image
          h('img', {
            attrs: {
              src: logoSrc, // Image source
              alt: '图片3'
            },
            style: {
              width: '100px', // Image width
              height: 'auto'
            }
          })
        ]);
      },
    },
  ];
}
