import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import NavHeader from "../../../Components/NavHeader";
import { appSize } from '../../../Components/GStyles.ts';

function IndexView(props: any) {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavHeader title={'关于我们'} />

        <ScrollView>
          <View style={{ padding: appSize(12) }}>
            <Text style={{ fontSize: appSize(14), lineHeight: appSize(24) }}>
              浙江省创客服务协会成立于2016年1月21日，是一家专注于推动创新创业生态建设的专业服务组织。协会以“服务创客、赋能创新、促进转化”为核心使命，长期致力于为个人创客、创业团队及中小企业提供全方位支持。
              {'\n'}
              {'\n'}
              协会主要业务涵盖创客培训、创客服务平台搭建，以及各类创客展会、论坛与交流活动的策划与承接。通过整合产业资源、链接资本与技术，协会为创新项目提供从创意孵化到商业落地的全链路服务，助力优质项目实现快速成长与规模化发展。
              {'\n'}
              {'\n'}
              在此基础上，协会打造了自有的OPC（开放平台协作 / Open Platform
              Collaboration）体系，并推出核心平台——NEXA。作为源自协会创新实践的开放协同平台，NEXA聚焦于打通“创意—产品—商业化”全流程，通过标准化接口与模块化能力，连接创客、开发者、设计师、企业与资本等多方资源，构建高效协同的创新网络。
              {'\n'}
              {'\n'}
              依托NEXA
              OPC平台，协会实现了资源的可视化与高效流转，让项目能够快速匹配所需能力与合作伙伴，显著提升孵化效率与商业转化成功率。同时，平台也为创客提供从需求发布、协同开发到成果变现的一站式支持，形成开放、共享、可持续的创新生态闭环。
              未来，浙江省创客服务协会将持续深化“创客+平台+生态”的发展模式，以NEXA
              OPC平台为核心载体，不断拓展服务边界与产业连接能力，致力于成为具有全国影响力的创新创业服务与协同平台。
            </Text>
          </View>
        </ScrollView>
      </View>
    );
}

export default IndexView;
