import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";


const prisma = new PrismaClient();

async function main(){
    console.log("Testing Prisma connection and data creation...")

    try {
        const newCategory = await prisma.category.create({
            data : {
                id: uuidv4(),
                name: 'Football News'
            }
        });
        console.log('Category Created', newCategory)

        const newArticle = await prisma.article.create({
            data : {
                id : uuidv4(),
                title: "ရော်နယ်လ်ဒိုရဲ့ Offensive off-the-ball play",
                meta_description: "ရော်နယ်လ်ဒိုရဲ့ Offensive off-the-ball play",
                image : "https://scontent.fphs3-1.fna.fbcdn.net/v/t39.30808-6/505754477_1013048177701605_4026608654598139483_n.jpg?stp=cp6_dst-jpg_s1080x2048_tt6&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=NFI_nf_OXD0Q7kNvwEvPPjv&_nc_oc=Adklu9Qz0gbWYSmio6jQZsqMwCZanCb61NLZ44KjAtnmZsW4dHt5s-DjJTe-HF6SS7iiwtWDsnAhebUryQgyzE42&_nc_zt=23&_nc_ht=scontent.fphs3-1.fna&_nc_gid=jYP1ZGaVPRbMnrvbU8S2NQ&oh=00_AfMwjzaOeMobPVmbYN2qtxyfTQ1dZeb-N1OvbZyDz4pXUQ&oe=685EF343",
                body : `
                    ရော်နယ်လ်ဒိုအနေနဲ့ ဒုတိယမြောက် နေးရှင်းလိဂ်အောင်ပွဲကို ရယူရာမှာ အသက် ၄၀ အရွယ် ရှိနေပေမဲ့ အရေးကြီးတဲ့ ကဏ္ဍကနေ ပါဝင်နေခဲ့ဆဲ ဖြစ်တယ်။ မိနစ် ၉၀ ပြည့်ခါနီးမှာ ကြံ့ခိုင်မှုပြဿနာကြောင့် ကွင်းပြင်ပေါ် ထိုင်ချလိုက်တဲ့၊ လူစားလဲခံလိုက်ရတဲ့ ရော်နယ်လ်ဒိုကို ကြည့်ပြီး သိပ်စိတ်မကောင်းဘူး။ သူ အရမ်းကန်ချင်နေတုန်း၊ ခန္ဓာကိုယ်က အပြည့်အဝ မလိုက်နိုင်တော့။ ဒါတောင် ရော်နယ်လ်ဒိုဟာ ပေါ်တူဂီရဲ့ အကောင်းဆုံးတိုက်စစ်မှူး ဖြစ်နေတုန်းပဲ။ ပေါ်တူဂီ ရသွားတဲ့ ဂိုး ၂ ဂိုးစလုံး ရော်နယ်လ်ဒိုနဲ့ ပတ်သက်နေတယ်။ သူ့ရဲ့ အရေးကြီးတဲ့ နေရာယူပုံ၊ လှုပ်ရှားပုံတွေက စပိန်ခံစစ်ကို ဖရိုဖရဲ ဖြစ်စေတယ်။

ပထမဂိုးမှာ လူကျွံထောက်ချောက်ကို ဖောက်ထွက်ပြီး ဘောလုံးလက်ခံရယူခဲ့တဲ့၊ နက်တိုကို ပေးပြီးနောက် ဧရိယာထဲမှာ နေရာယူထားခဲ့တဲ့ Positioning က သူ့ရဲ့ ဗီဇ၊ သူ့ရဲ့ အတွေ့အကြုံပါပဲ။ ဒုတိယဂိုးမှာလည်း ဂိုးသွင်းမုဆိုးရဲ့ ဗီဇကို ပြသခဲ့တယ်။ ဆိုလိုချင်တာက ရော်နယ်လ်ဒိုဟာ ကောက်စားတွေ သွင်းနေတာမျှ မဟုတ်ဘူး။ ပေါ်တူဂီတိုက်စစ်အတွက် အလွန်အရေးပါတယ်။ သူ့ကို တည်ကစားနေခြင်းက ပေါ်တူဂီကို ပုံစံမှန် ရရှိစေတယ်။ ဘောလုံးနဲ့ ပတ်သက်လာရင် ဘောလုံးကိုင်ထားပြီး လွှမ်းမိုးတဲ့ စွမ်းရည်၊ ဘောလုံး မရှိတုန်း လိုက်လုတဲ့ စွမ်းရည်တွေကို ရှေ့တန်းတင်ကြပါတယ်။ ဒါပေမဲ့ ဘောလုံး ခြေထဲမရှိတဲ့အချိန် နေရာယူတဲ့ - Offensive off-the-ball play ကိုလည်း ကြီးမားစွာ ရှုမြင်ကြဖို့ လိုအပ်တယ်။ ဒါဟာ ရော်နယ်လ်ဒိုရဲ့ GOAT အဆင့်ကို သတ်မှတ်တဲ့အခါ ထည့်စဉ်းစားဖို့ မေ့နေတတ်တဲ့အရာတစ်ခုအဖြစ် တင်ပြချင်တယ်။
                `,
                categoryId : newCategory.id,
            },
            include : {
                category : true
            }
        });
        console.log('Article Created', newArticle)

        const allArticles = await prisma.article.findMany({
            include : {
                category : true
            }
        });
        console.log('All articles fetched', allArticles)
    } catch (error : any) {
        console.error("An error occured during the test: ", error )
    } finally {
        await prisma.$disconnect();
    }
}

main()