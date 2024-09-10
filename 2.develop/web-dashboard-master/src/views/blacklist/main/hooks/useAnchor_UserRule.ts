

export default function (anchor_or_user: string, searchUsers, fApi: Ref<Api>) {

  const blockUserOptions = ref([
    // { value: '1', label: 'John Doe (1)' },
    // { value: '2', label: 'Jane Smith (2)' }
  ]);

  return [
    {
      type: 'autoComplete', // Use AutoComplete to enable search functionality
      field: 'block_users',
      title: '拉黑' + anchor_or_user,
      props: {
        placeholder: '请输入' + anchor_or_user + 'ID搜索',
        allowClear: true,
        options: blockUserOptions, // Directly bind the options here
        filterOption: false, // Disable default filtering since we're handling it
        notFoundContent: '无匹配结果', // To display if no match is found
      },
      on: {
        search: async (searchText: string) => {
          if (searchText) {
            try {
              // Fetch the user options based on search text
              const options = await searchUsers(searchText, anchor_or_user);
              console.log('Fetched options:', options); // Log to ensure correct options are fetched

              // Directly update blockUserOptions
              blockUserOptions.value = options;
              console.log('Updated blockUserOptions:', blockUserOptions.value); // Log updated options
            } catch (error) {
              console.error('Error fetching search results:', error);
            }
          } else {
            // Clear the options if the search text is empty
            blockUserOptions.value = [];
          }
        },
        select: (selected: { label: string; value: string }) => {
          selectedUser.value = selected; // Save selected user as an object with label and value
          console.log('Selected user:', selectedUser.value);
        }
      }
    },
    {
      type: 'checkbox',
      field: 'block_type',
      title: '拉黑类型',
      value: '',
      options: Object.keys(ENUM.block_type2).map(key => ({ label: ENUM.block_type2[key], value: parseInt(key) })),
    },
    {
      type: 'radio',
      field: 'blacklist_type',
      title: '拉黑时效',
      value: 1, // Default to 'allTime'
      options: Object.keys(ENUM.blacklist_type).map(key => ({ label: ENUM.blacklist_type[key], value: parseInt(key) })),
      on: {
        change: (val) => {

          const selectedValue = val.value || val

          console.log("Selected value (after accessing):", selectedValue)
          console.log("selectedValue.target.value : ", selectedValue.target.value)

          // Show the field depending on the selected radio option
          if (selectedValue.target.value === 3)
            fApi.value.hidden(false, 'join_time')
          else{
            fApi.value.hidden(true, 'join_time')
            console.log("value3 : " + selectedValue)
          }
        },
      },
    },
    {
      type: 'datePicker',
      field: 'join_time',
      title: '自定义时间',
      value: '',
      props: {
        format: 'YYYY-MM-DD',
        valueFormat: 'X',
        placeholder: ['开始时间', '结束时间'],
      },
      hidden: true,
      wrap: {
        labelCol: {
          span: 5,
        },
      },
    },
    {
      type: 'select',
      field: 'blacklist_platform',
      title: '拉黑平台',
      value: '全部平台',
      props: {
        placeholder: '请选择拉黑平台',
      },
    },
    {
      type: 'input',
      field: 'reason',
      title: '理由',
      value: '',
      props: {
        placeholder: '请输入拉黑理由',
        type: 'textarea',
      },
    },
  ];
}

