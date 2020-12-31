import React from 'react'
import { Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { PictureHeadline } from '../components/shared'
import { IMAGE_URL } from '../utils/helperFunctions'
import HTML from 'react-native-render-html'

export const ArticleScreen = () => {
  const article = {
    article: {
      headline:
        'President and former Penn Professor Joe Biden, who has Penn ties mentioned Penn in a speech about Penn. Penn Penn University of Pennsylvania Quaker Penn',
      published_at: '2 hrs ago',
      abstract: '<p>Something something something something</p>',
      dominantMedia: {
        attachment_uuid: 'f868181a-cc59-4195-8595-c13c0816642c',
        extension: 'jpg',
      },
      content:
        '<p>President-elect Joe Biden and Vice President-elect Kamala Harris named three Penn graduates to their incoming White House staff this week.&nbsp;</p>\n<p>In a <a href="https://buildbackbetter.gov/press-releases/president-elect-joe-biden-and-vice-president-elect-kamala-harris-announce-additional-members-of-white-house-staff/" target="_blank">press release</a> issued Wednesday, the Biden-Harris transition team announced 27 additional White House staffers to serve in the incoming administration, including 2019 Penn Law graduate Ashley Williams as deputy director of Oval Office Operations and 1991 College graduate Michael Hochman as deputy staff secretary.&nbsp;</p>\n<p>The transition team also named 2012 College graduate Sonya Bernstein as a COVID senior policy advisor of the White House COVID-19 Response Team, according to a separate press release issued Tuesday.&nbsp;</p>\n<p>The roll out completes the incoming administration\'s goal of appointing 100 staffers by the end of this year — double what the Obama administration had announced by the end of 2008.&nbsp;</p>\n<p>Before he was elected, Biden <a href="https://www.theguardian.com/us-news/2020/nov/17/joe-biden-appointments-jen-o-malley-dillon" target="_blank">vowed</a> to build an administration that "looks like America," and Biden and Harris continue to emphasize the importance and benefits of a more diverse staff. The <a href="https://buildbackbetter.gov/nominees-and-appointees/white-house-personnel/" target="_blank">group of 100-plus appointees</a> is made up of 61% women, 54% people of color, and almost 20% first-generation Americans, according to the press release. Appointees who identify as LGBTQ account for 11% of all White House staff.</p>\n<p>Many of the appointees are longtime Biden affiliates and Democratic party aides who come from a wide range of backgrounds, as <a href="https://www.pbs.org/newshour/politics/biden-team-announces-new-staff-picks-highlighting-effort-to-build-an-administration-that-looks-like-america" target="_blank">reported</a> by PBS NewsHour.</p>\n<p>Williams, who is the trip director for the transition team and served in the same role on the Biden-Harris campaign, will be the <a href="https://www.pbs.org/newshour/politics/biden-team-announces-new-staff-picks-highlighting-effort-to-build-an-administration-that-looks-like-america" target="_blank">first Black woman</a> to fill the role of deputy director of Oval Office Operations. Oval Office Operations staffers are largely <a href="https://buildbackbetter.gov/nominees-and-appointees/annie-tomasini/" target="_blank">responsible</a> for managing the President’s personal schedule, private engagements, and day-to-day affairs.&nbsp;</p>\n<p>Williams has <a href="https://dc.medill.northwestern.edu/blog/2019/05/23/black-staff-matters-behind-the-scenes-with-the-biden-2020-team/#sthash.Xxje7T45.dpbs" target="_blank">worked</a> for the Biden family in a number of roles, including as senior assistant to Jill Biden at the White House during the Obama administration. She also worked as a special advisor and director of special projects at the United States Department of State for the Ambassador-at-Large for Global Women’s Issues.&nbsp;</p>\n<p>In May 2019, Williams simultaneously obtained her Master’s degree in Political Management from George Washington University and her <a href="https://www.becauseofthemwecan.com/blogs/news/she-received-her-master-s-degree-and-law-degree-in-the-same-week-from-two-different-universities" target="_blank">Juris Doctorate from Penn</a>.&nbsp;</p>\n<p>Joining the <a href="https://www.whitehouse.gov/get-involved/internships/presidential-departments/" target="_blank">Office of the Staff Secretary</a>, Hochman will aid in preparing the daily briefing book and ensuring that details regarding actions, speeches, events, correspondence, and press releases are adequately vetted.&nbsp;</p>\n<p>After majoring in Communication at Penn and receiving his J.D. from Boston College Law School in 1995, Hochman gained extensive <a href="https://www.monlaw.com/michael-c-hochman/" target="_blank">experience</a> in both Federal and State courts and practiced with renowned law firms. He has also served as an advisor and officer for several state and national political campaigns and committees.</p>\n<p>Hochman was also a close friend and college<strong> </strong><a href="https://www.delawareonline.com/story/news/local/2015/05/31/remembering-beau-biden-outstanding-man/28284039/" target="_blank">roommate</a> of Biden’s son, Beau, a fellow 1991 College graduate, according to a previous <a href="https://www.thedp.com/article/2015/06/people-remember-beau-biden" target="_blank">report</a> by The Daily Pennsylvanian.&nbsp;</p>\n<p>Bernstein, who is currently an advisor for COVID-19 on the Biden-Harris transition team, will join members of the response team in efforts to "quickly implement a comprehensive, whole-of-government COVID-19 response strategy to contain the pandemic, restore public trust, and protect all Americans," according to the Dec. 29 press release.</p>\n<p>After majoring in political science at Penn, Bernstein received her Master of Public Administration from the Fels Institute in 2012.&nbsp;Prior to her role with Biden\'s administration, she served as assistant vice president at NYC Health + Hospitals and assistant secretary for health &amp; economic policy for the State of New York. She has also served as deputy chief of staff and special advisor to Secretary Sylvia M. Burwell at the United States Department of Health and Human Services.</p>\n<p>With these new appointments <a href="https://www.npr.org/2020/11/17/933848488/biden-administration-heres-who-has-been-nominated" target="_blank">underway</a>, Biden is poised to take office in three weeks on Jan. 20, 2021.</p>',
    },
  }

  return (
    <ScrollView>
      <PictureHeadline
        headline={article.article.headline}
        time={article.article.published_at}
        imageUrl={IMAGE_URL(
          article.article.dominantMedia.attachment_uuid,
          article.article.dominantMedia.extension
        )}
        category="NEWS"
      />
      <View style={{ padding: 20 }}>
        <HTML
          source={{ html: article.article.content }}
          contentWidth={10}
          tagsStyles={{ p: { fontSize: 16, paddingVertical: 5 } }}
        />
      </View>
    </ScrollView>
  )
}
