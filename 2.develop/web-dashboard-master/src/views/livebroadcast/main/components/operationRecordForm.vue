<template>
    <a-tabs v-model:activeKey="tab1" centered class="custom-tabs">
          <a-tab-pane key="tab1" tab="分类">
          <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <div style="font-size: 12px;">主播昵称</div>
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">充值用户/贵族用户</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a-dropdown placement="bottomRight" :overlay="props.menu_in_card()">
                    <span
                      style="font-size: 12px; cursor: pointer; color: #1890ff;"
                    >
                      25位主播
                    </span>
                  </a-dropdown>

                  <a-row justify="space-between">
                    <a-col>
                      <div style="font-size: 12px; margin-right: 10px;">XX层级/XX层级</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          <a-tab-pane key="tab2" tab="隐藏">
            <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">主播昵称</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        本场直播
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a-row justify="space-between">
                    <a-dropdown placement="bottomRight" :overlay="props.menu_in_card()">
                      <a
                        href="javascript:void(0);"
                        style="font-size: 12px; cursor: pointer; color: #1890ff;"
                      >
                        24位主播
                      </a>
                    </a-dropdown>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          <a-tab-pane key="tab3" tab="屏蔽">
            <div>
            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle" margin="0">
                <a-col span="18">
                  <a-row  justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">普通房间/贵族房间</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>

            <a-card hoverable style="width: 100%; margin-bottom: 16px; background: grey;">
              <a-row type="flex" justify="space-between" align="middle">
                <a-col span="18">
                  <a-row justify="space-between">
                    <a-col>
                      <div style="margin-right: 10px;font-size: 12px;">普通房间/贵族房间</div>
                    </a-col>
                    <a-col>
                      <div style="font-size: 12px; white-space: nowrap; text-overflow: ellipsis; text-align: right;">
                        2022-12-12 12:21 —— 2022-12-12 12:21
                      </div>
                    </a-col>
                  </a-row>
                </a-col>
                <a-col span="4" style="font-size: 12px; display: flex; justify-content: flex-end; align-items: center;">
                  <a-button type="primary">
                    删除
                  </a-button>
                </a-col>
              </a-row>
            </a-card>
          </div>
          </a-tab-pane>

          </a-tabs>
</template>

<script lang="jsx" setup>

const props = defineProps({
    // Todo
    menu_in_card: {
        type: Function,
        required: true
    }
})

</script>