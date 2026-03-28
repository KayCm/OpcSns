import {View,Text, TouchableOpacity} from "react-native";
import WebView from 'react-native-webview';
import {useSafeAreaInsets} from "react-native-safe-area-context";
import GStyles, {NAVIGATOR_HEIGHT, TRUE_ONE_LINE} from "../../../Components/GStyles";
import IconNavBack from "../../../Assets/Svgs/IconNavBack";
import IconMore from "../../../Assets/Svgs/IconMore";
import {useNavigation} from "@react-navigation/native";
import {Video } from 'react-native-video';

function IndexView(props: any) {

   const nav = useNavigation()

    const item = props?.route?.params?.item

    const insets = useSafeAreaInsets();

   console.log('props',props?.route?.params?.item)

    // const html = props?.route?.params?.html

    const html = `
    <div class="article-content">
\t\t\t\t\t\t\t\t\t<!--content-->
\t\t\t\t\t\t\t\t\t<p style="text-indent:2em">央广网北京11月16日消息（记者  樊瑞）11月13日，由太湖世界文化论坛主办，太湖世界文化论坛财富文化发展工作委员会、《财经》杂志、《财经智库》、浙江金融研究院、浙江财鑫传媒承办的“太湖世界文化论坛·钱塘对话”在杭州举办。在本次论坛上，北京大学国家发展研究院院长、央行货币政策委员会委员黄益平与诺贝尔经济学奖得主Michael  Spence（迈克尔·斯宾塞）进行对话。</p>

<p style="text-align:center"><img src="https://mediabluk.cnr.cn/img/cnr/CNRCDP/2025/1116/72d0af2981c4a176325998808977762310.jpg?auth=0d4ee93c0422c11a7ff2e75214df9b07" style=";max-width:100%;height:auto;"></p>

<p style="text-align:center; text-indent:2em">北京大学国家发展研究院院长、央行货币政策委员会委员黄益平对话诺贝尔经济学奖得主Michael  Spence（迈克尔·斯宾塞）（主办方供图  央广网发）</p>

<p style="text-indent:2em">在对话开场，斯宾塞介绍了美国的经济情况，并认为美国股市已经陷入“疯狂”。他指出，这主要是由数字领域尤其是人工智能的热情和投资所驱动。“整个市场都在大规模投资人工智能模型和研发，还有量子计算，我们正在大规模投资数据中心及相关的电力供应，未来可能还会大规模投资发电能力，因为电力需求在持续上升。我认为市场中存在一些泡沫。”他谈道。</p>

<p style="text-indent:2em">对于股市表现“疯狂”的原因，斯宾塞总结为“投资不足所付出的代价远高于投资过度所付出的成本”。比如美国的科技巨头企业，如果落后于第二或第三而且被拉开巨大差距，就会被淘汰出局。这就导致了各方都在大笔投资，可能有些投资过度，结果就是，标普500指数超过30%的市值都集中在前七大科技公司。</p>

<p style="text-indent:2em">在被问及人工智能大量投资是否可能带来人工智能泡沫风险时，斯宾塞指出，他在最近的一次谈话中将其称为“理性泡沫”。他举例道：“在硅谷，有一种人人都说并且都相信的说法。那就是人们往往会高估重大技术突破的影响，高估它的短期影响，而低估它的长期影响。”</p>

<p style="text-indent:2em">至于原因，斯宾塞认为，如果站在谷歌、微软、Meta或亚马逊的立场，相比过度投资或效率低下带来的损失，在竞争中沦为第三名所付出的代价过于巨大，所以他们都在以极高的速度投资。于是就有了投资浪潮，金融市场也随之跟进。但这不是不理性的投资，之所以认为这是理性的，是因为这些投资决策背后的逻辑是，一旦被淘汰出局，就会付出比现在更高得多的代价。</p>

<p style="text-indent:2em">对话期间，黄益平和斯宾塞也谈到欧洲在大型科技和人工智能领域的创新，黄益平就“如何处理监管与创新的关系”的话题提问道：“欧洲现在甚至没有出现人工智能领域的领跑者，GDPR、数据保护法等都非常严格，很好地保护了个人权利，但损害了相关领域的创新。欧盟还出台了《人工智能法案》，将人工智能创新分为不同等级并加以监管。在您看来，欧洲为何建立如此严格的监管？”</p>

<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>
<p style="text-indent:2em">斯宾塞表示，建立完善的监管框架并没有错，对于如此重要的领域，一个好的监管框架或政策框架能带来两大好处：第一，能缓解风险，防止滥用；第二，有助于积极促进创新与进步。</p>

<p style="text-indent:2em">他认为，与其说欧洲在监管方面做得有些过头，不如说他们缺少了向上的动力，他们缺少了研究经费，缺少了成为这个领域主导者所需的基础设施。“我不是要否认他们在预防风险和滥用方面存在过度监管。但我认为真正重要、真正急需改变的是，他们要补充自己上行的潜力。”斯宾塞指出。</p>

<p style="text-indent:2em">对于人工智能未来的发展，斯宾塞认为，现在依然难以准确预测人工智能对劳动力市场的影响等因素的发展，但目前有一项日渐成熟的共识，即人工智能未来的用途并不取决于当下的预测，而是要由选择来决定，可以选择在自动化与人机合作之间取得平衡，只要决定这么做。当然有意愿并不意味着会很容易实现。</p>
\t\t\t\t\t\t\t\t\t<!--/content-->
\t\t\t\t\t\t\t\t</div>
    `

    const DetailHeader = () => {
        const insets = useSafeAreaInsets()
        return(<View style={{height:insets.top+NAVIGATOR_HEIGHT,width:'100%',paddingTop:insets.top,backgroundColor:'#ffffff',borderBottomColor:'#00000030',borderBottomWidth:TRUE_ONE_LINE}}>
            <View style={[GStyles.row,GStyles.ac,GStyles.jcBetween,GStyles.ph12,{height:NAVIGATOR_HEIGHT,width:'100%'}]}>
                <TouchableOpacity onPress={()=>{
                    nav.goBack()
                }}>
                    <IconNavBack />
                </TouchableOpacity>
                <Text style={{fontSize:18,fontWeight:'800'}}>OPC NEWS</Text>
                <TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:32,height:32}]}>
                    <IconMore />
                </TouchableOpacity>
            </View>
        </View>)
    }

    const VipBanner = () => {
      return(<View style={[GStyles.pa,GStyles.row,GStyles.ac,{bottom:0,left:0,width:'100%',height:54+insets.bottom,backgroundColor:'#123'}]}>

          <View style={[GStyles.jc,GStyles.ac,{flex:1,backgroundColor:'#fcefbd',height:54+insets.bottom}]} >
              <Text style={{fontSize:14,fontWeight:'400',color:'#000'}}>本义为精英VIP专享文章</Text>
          </View>

          <TouchableOpacity style={[GStyles.jc,GStyles.ac,{width:150,height:54+insets.bottom,backgroundColor:'#FFCC00'}]} >
              <Text style={{fontSize:20,fontWeight:'600',color:'#fff'}}>立即开通</Text>
          </TouchableOpacity>



      </View>)
    }

    const DetailWithVideo = () => {

        return(<View>
            <Video
                source={{uri:'https://www.w3schools.com/html/mov_bbb.mp4'}}
                style={{ width: '100%', aspectRatio: 16 / 9 }}
            />
            <View style={[GStyles.ph12]}>
                <Text style={{fontSize:24}}>每天工作2小时，年人500万美元，Dan Koe的"人生操作系统"</Text>
            </View>
        </View>)
    }

    const DetailWithHtml = () => {
      return (<View style={{flex:1}}>
              <View style={[GStyles.ph12]}>
                  <Text style={{fontSize:24}}>{item?.title}</Text>
              </View>
              <WebView source={{ html:item?.content}} style={{ flex: 1,height:200, width: '100%' }} />
        </View>)
    }

    return (
        <View style={{ flex: 1,paddingBottom:54+insets.bottom,backgroundColor:'#fff'}}>
            <DetailHeader />

            <DetailWithHtml />

            <VipBanner />
        </View>
    );
}

export default IndexView;
