<template>
  <scroll-bar>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF" :router="true">
      <el-menu-item index="/" style="font-size: 18px; color:#fff;border-bottom: 1px solid #304110">
      <i class="el-icon-home"></i>
      <span>牛霸霸屏</span>
    </el-menu-item>
      <el-menu-item index="/dashboard" v-if="hasPower('/dashboard')">
          <svg-icon class-name='international-icon' icon-class="dashboard" />
          <span>数据总览</span>
      </el-menu-item>
      <el-menu-item index="/barManage/index" v-if="hasPower('/barManage/index')">
          <svg-icon class-name='international-icon' icon-class="bar" />
          <span>商户列表</span>
      </el-menu-item>
      <el-menu-item index="/bigScreenManage/index" v-if="hasPower('/bigScreenManage/index')">
          <svg-icon class-name='international-icon' icon-class="bigscreen" />
          <span>大屏幕管理</span>
      </el-menu-item>
      <el-menu-item index="/resourceManage/index" v-if="hasPower('/resourceManage/index')">
          <svg-icon class-name='international-icon' icon-class="resource" />
      <span>资源管理</span>
      </el-menu-item>
      <el-submenu index="/financeManage" class="nest-menu" v-if="hasPower('/financeManage')">
        <template slot="title">
          <svg-icon class-name='international-icon' icon-class="finance" />
          <span>财务管理</span>
        </template>
        <el-menu-item index="/financeManage/statistics" v-if="hasPower('/financeManage/statistics')">
          <svg-icon class-name='international-icon' icon-class="statistics" />
          <span>商户总统计</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/defaultDivide" v-if="hasPower('/financeManage/defaultDivide')">
          <svg-icon class-name='international-icon' icon-class="divide" />
          <span>代理分成</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/orderList" v-if="hasPower('/financeManage/orderList')">
          <svg-icon class-name='international-icon' icon-class="order" />
          <span>订单详情</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/rechargeList" v-if="hasPower('/financeManage/rechargeList')">
          <svg-icon class-name='international-icon' icon-class="recharge" />
          <span>充值详情</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/depositList" v-if="hasPower('/financeManage/depositList')">
          <svg-icon class-name='international-icon' icon-class="deposit" />
          <span>提现详情</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/exchangeList" v-if="hasPower('/financeManage/exchangeList')">
          <svg-icon class-name='international-icon' icon-class="exchange" />
          <span>兑换详情</span>
        </el-menu-item>
        <el-menu-item index="/financeManage/packetList" v-if="hasPower('/financeManage/packetList')">
          <svg-icon class-name='international-icon' icon-class="packet" />
          <span>红包详情</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/userManage" class="nest-menu" v-if="hasPower('/userManage')">
        <template slot="title">
          <svg-icon class-name='international-icon' icon-class="userm" />
          <span>用户管理</span>
        </template>
        <el-menu-item index="/userManage/barManager" v-if="hasPower('/userManage/barManager')">
          <svg-icon class-name='international-icon' icon-class="barmanager" />
          <span>酒吧管理员</span>
        </el-menu-item>
        <el-menu-item index="/userManage/agentManager" v-if="hasPower('/userManage/agentManager')">
          <svg-icon class-name='international-icon' icon-class="agent" />
          <span>代理管理</span>
        </el-menu-item>
        <el-menu-item index="/userManage/wxManager" v-if="hasPower('/userManage/wxManager')">
          <svg-icon class-name='international-icon' icon-class="wxuser" />
          <span>微信用户</span>
        </el-menu-item>
        <el-menu-item index="/userManage/business" v-if="hasPower('/userManage/business')">
          <svg-icon class-name='international-icon' icon-class="member" />
          <span>商家用户</span>
        </el-menu-item>
        <el-menu-item index="/userManage/adminManager" v-if="hasPower('/userManage/adminManager')">
          <svg-icon class-name='international-icon' icon-class="barmanager" />
          <span>用户端超管</span>
        </el-menu-item>
        <el-menu-item index="/userManage/blackManager" v-if="hasPower('/userManage/blackManager')">
          <svg-icon class-name='international-icon' icon-class="member" />
          <span>黑名单用户</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/systemManage" class="nest-menu" v-if="hasPower('/systemManage')">
        <template slot="title">
          <svg-icon class-name='international-icon' icon-class="system" />
          <span>系统管理</span>
        </template>
        <el-menu-item index="/systemManage/systemUser" v-if="hasPower('/systemManage/systemUser')">
          <svg-icon class-name='international-icon' icon-class="systemuser" />
          <span>系统用户</span>
        </el-menu-item>
        <el-menu-item index="/systemManage/roleManage" v-if="hasPower('/systemManage/roleManage')">
          <svg-icon class-name='international-icon' icon-class="systemuser" />
          <span>角色管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/systemVersion" class="nest-menu" v-if="hasPower('/systemVersion')">
        <template slot="title">
          <svg-icon class-name='international-icon' icon-class="version" />
          <span>版本管理</span>
        </template>
        <el-menu-item index="/systemVersion/systemVersionUser" v-if="hasPower('/systemVersion/systemVersionUser')">
          <svg-icon class-name='international-icon' icon-class="version" />
          <span>用户端</span>
        </el-menu-item>
        <el-menu-item index="/systemVersion/systemVersionClient" v-if="hasPower('/systemVersion/systemVersionClient')">
          <svg-icon class-name='international-icon' icon-class="version" />
          <span>客户端</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="/systemSetting/index" v-if="hasPower('/systemSetting/index')">
          <svg-icon class-name='international-icon' icon-class="system" />
          <span>系统设置</span>
      </el-menu-item>
      <el-menu-item index="/messageManage/index" v-if="hasPower('/messageManage/index')">
          <svg-icon class-name='international-icon' icon-class="system" />
          <span>消息管理</span>
      </el-menu-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      return this.$router.options.routes
    }
  }
}
</script>
