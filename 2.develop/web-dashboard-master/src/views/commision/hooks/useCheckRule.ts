
// Use new URL to dynamically resolve the image path

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
  ]
}
