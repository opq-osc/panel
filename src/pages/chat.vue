<template>
  <div class="q-ma-md">
    <q-scroll-area style="height: calc(100vh - 128px); max-width: 300px">
      <q-list>
        <q-item-label header>好友</q-item-label>
        <q-expansion-item
          icon="perm_identity"
          label="我的好友"
          :caption="`${friend.Friend_count}人`"
        >
          <q-card flat>
            <q-card-section>
              <q-item
                clickable
                v-ripple
                v-for="(item, index) in friend.Friendlist"
                :key="index"
              >
                <q-item-section avatar top>
                  <q-avatar>
                    <img
                      :src="`https://q1.qlogo.cn/g?b=qq&nk=${item.FriendUin}&s=640`"
                    />
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label lines="1">{{
                    item.IsRemark
                      ? `${item.Remark}(${item.NickName})`
                      : item.NickName
                  }}</q-item-label>
                  <q-item-label caption
                    >[{{
                      item.OnlineStr === '' ? '离线' : item.OnlineStr
                    }}]</q-item-label
                  >
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
      <q-list>
        <q-item-label header>群</q-item-label>
        <q-card flat>
          <q-card-section>
            <q-item
              clickable
              v-ripple
              v-for="(item, index) in troop.TroopList"
              :key="index"
            >
              <q-item-section avatar top>
                <q-avatar>
                  <img
                    :src="`https://p.qlogo.cn/gh/194644518/${item.GroupId}/0`"
                  />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label lines="1">{{ item.GroupName }}</q-item-label>
                <q-item-label caption
                  >[{{ item.GroupTotalCount }}/{{
                    item.GroupMemberCount
                  }}人]</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </q-list>
    </q-scroll-area>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';

export interface Friend {
  Friend_count: number;
  Friendlist: Friendlist[];
  GetfriendCount: number;
  StartIndex: number;
  Totoal_friend_count: number;
}

export interface Friendlist {
  FriendUin: number;
  IsRemark: boolean;
  NickName: string;
  OnlineStr: string;
  Remark: string;
  Status: number;
}

export interface Group {
  Count: number;
  NextToken: string;
  TroopList: TroopList[];
}

export interface TroopList {
  GroupId: number;
  GroupMemberCount: number;
  GroupName: string;
  GroupNotice: string;
  GroupOwner: number;
  GroupTotalCount: number;
}

const $q = useQuasar();

const friend = ref<Partial<Friend>>({});
const troop = ref<Partial<Group>>({});

onMounted(() => {
  void getQQUserList();
  void getGroupList();
});

const getQQUserList = async () => {
  try {
    const data: Friend = await api.post(
      `LuaApiCaller?qq=${
        $q.localStorage.getItem<number>('CurrentQQ') ?? 0
      }&funcname=GetQQUserList`,
      {
        StartIndex: 0,
      }
    );
    friend.value = data;
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: '获取好友列表失败!',
    });
  }
};

const getGroupList = async () => {
  try {
    const data: Group = await api.post(
      `LuaApiCaller?qq=${
        $q.localStorage.getItem<number>('CurrentQQ') ?? 0
      }&funcname=GetGroupList`,
      {
        NextToken: '',
      }
    );
    troop.value = data;
  } catch (e) {
    $q.notify({
      type: 'negative',
      message: '获取群列表失败!',
    });
  }
};
</script>
