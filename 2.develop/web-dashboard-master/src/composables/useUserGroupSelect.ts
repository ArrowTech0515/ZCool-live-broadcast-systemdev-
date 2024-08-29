import UserGroupSelect from '@/components/Form/UserSelect/UserGroupSelect.vue'

export default function () {
  const userRelRule = {
    type: 'UserGroupSelect',
    field: 'target_user_group_list',
    title: '选择用户',
    value: [],
    effect: {
      required: true,
    },
  }

  onBeforeMount(() => {
    formCreate.component('UserGroupSelect', UserGroupSelect)
  })

  return {
    userRelRule,
  }
}
