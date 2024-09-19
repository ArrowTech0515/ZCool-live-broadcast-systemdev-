
// Use new URL to dynamically resolve the image path

export default function (record: any, fApi: Ref<Api>) {
  return [
    {
      type: 'input',
      field: 'evidence_content',
      title: '证据内容',
      value: '',
      props: {
        placeholder: '证据内容',
        type: 'textarea',
        //editable: false,
      },
    },
  ]
}
