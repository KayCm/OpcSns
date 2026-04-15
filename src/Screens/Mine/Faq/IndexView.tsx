import {View,Text, TouchableOpacity, ScrollView } from "react-native";
import NavHeader from "../../../Components/NavHeader";
import GStyles, { appSize } from '../../../Components/GStyles.ts';

function IndexView(props: any) {

    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <NavHeader title={'常见问题'} />
        <ScrollView>
          <View style={{paddingBottom:appSize(44), paddingHorizontal: appSize(12) }}>
            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              1. STARFIELD OPC平台是什么？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              STARFIELD是由浙江省创客服务协会打造的开放平台协作（OPC）系统，旨在连接创客、开发者、设计师与企业资源，提供从创意到商业化的一站式协同平台。
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              2. OPC具体指什么？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              OPC（Open Platform
              Collaboration）是一种开放协作模式，通过标准化能力接口，将不同角色（如产品、设计、技术、运营等）连接起来，实现资源共享与高效协同。
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              3. 平台适合哪些人使用？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              STARFIELD适用于多类用户： {'\n'}创业者 / 创客（有想法但缺资源）
              产品经理 /{'\n'}设计师 / 开发者（希望参与项目变现）
              {'\n'}企业（需要外部创新能力或项目孵化） 投资机构 /{'\n'}
              资源方（寻找优质项目）{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              4. 和传统众包/外包平台有什么区别？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              STARFIELD不仅是“接单平台”，而是“协同孵化平台”：
              {'\n'}不只是任务交易，而是项目共创 {'\n'}
              支持长期协作，而非一次性交付 {'\n'}
              强调成果分成与商业变现，而非单次费用{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              5. 如果我只有一个想法，没有团队可以吗？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              可以。STARFIELD的核心价值之一就是“补全能力”：
              平台会帮助你匹配产品经理、设计师、开发者等，快速组成一个临时或长期项目团队。
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              6. 平台如何保障项目质量？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              通过多种机制保障： {'\n'}标准化项目流程（OPC结构）
              {'\n'}角色能力标签与评价体系 {'\n'}阶段性交付与验收机制
              {'\n'}平台介入协调与支持{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              7. 如何实现盈利或变现？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              平台支持多种变现方式： {'\n'}产品上线后的收入分成
              {'\n'}项目孵化后融资或出售 {'\n'}企业合作定制项目收益
              {'\n'}工具类/内容类产品长期收益{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              8. 是否需要付费使用平台？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              基础功能通常收取少量费用，部分增值服务（如： {'\n'}精准资源匹配
              {'\n'}项目加速服务 {'\n'}商业化支持
              ）可能会收取一定服务费用或参与分成。{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              9. 是否有成功案例？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              平台已完成多个项目从0到1孵化。部分项目已实现稳定月收入或进入融资阶段。
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              10. 企业如何使用STARFIELD？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              企业可以通过平台： {'\n'}发布创新需求 {'\n'}寻找外部产品团队
              {'\n'}快速验证新业务方向（低成本试错） {'\n'}搭建外部创新协作网络{' '}
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              11. 和创客服务协会是什么关系？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              STARFIELD是由浙江省创客服务协会发起并持续运营的核心平台，是协会推动“创客生态+产业协同”的重要基础设施。
            </Text>

            <Text
              style={[
                GStyles.ffh11,
                { marginTop: appSize(10), fontSize: appSize(20) },
              ]}
            >
              12. 如何加入平台？
            </Text>
            <Text style={{ marginTop: appSize(4), fontSize: appSize(14) }}>
              通常可以通过： {'\n'}联系 {'\n'}提交个人/团队资料
              {'\n'}完成能力标签与认证 {'\n'}即可参与项目或发起项目 
            </Text>
          </View>
        </ScrollView>
      </View>
    );
}

export default IndexView;
