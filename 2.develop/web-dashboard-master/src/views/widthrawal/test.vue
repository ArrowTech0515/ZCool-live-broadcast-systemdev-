<!-- eslint-disable unused-imports/no-unused-imports -->
<template>
  <a-button @click="editItem">aaa</a-button>
</template>

<script lang="jsx">

import { getAnchorListReq, anchorAddOrEditReq, setAnchorBlackReq } from '@/api/anchor'
import ENUMS from '@/enums/common'
import blockUserRule from '@/rules/blockUserRule'
import MerchCell from '@/components/Business/MerchCell.jsx'
import useAnchorRule from '@/views/anchor/list/hooks/useAnchorRule'
import { getPathFromUrlArray } from '@/utils/index'

const { createDialog } = useDialog()


export default {
  methods: {
    async editItem() {
    
      const formValue = ref({
        avatar_url: '',
        nickname: '',
        phone: '',
        email: '',
        guild_id: '',
        ps_ratio: '',
        hourly_rate: '',
        hourly_rate_ulimit: '',
        password: '',
        merch_id: [],
      })

      console.log("ediItem2 : " + formValue.email)

      const fApi = ref(null)
      const anchorRule = useAnchorRule(false, true, fApi)
      const formModalProps = reactive({
        request: data => anchorAddOrEditReq(null, data),
        getData(data) {
          const { avatar_url, ...rest } = data
          return {
            ...rest,
            avatar_url: getPathFromUrlArray(avatar_url),
          }
        },
        rule: anchorRule,
      })

      createDialog({
        title: '添加主播',
        width: 500,
        component:
          <ModalForm
            v-model={formValue.value}
            v-model:fApi={fApi.value}
            {...formModalProps}
          >
          </ModalForm>
        ,
        onConfirm() {
          pagination.page = 1
          pagination.total = 0
          props.resetSearch()
        },
      })
    }
  }
}
</script>
