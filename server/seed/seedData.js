const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const Platform = require('../models/Platform');
const Analytics = require('../models/Analytics');
const Post = require('../models/Post');

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialpulse';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing data...');
    await Platform.deleteMany({});
    await Analytics.deleteMany({});
    await Post.deleteMany({});

    console.log('Creating platforms...');
    const platformsData = [
      {
        platformName: 'Instagram',
        username: '@socialpulse_app',
        followers: 128450,
        connectedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
      },
      {
        platformName: 'Facebook',
        username: '@socialpulse_official',
        followers: 89300,
        connectedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
      },
      {
        platformName: 'YouTube',
        username: '@SocialPulseHQ',
        followers: 198600,
        connectedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
      },
      {
        platformName: 'X',
        username: '@SocialPulseIO',
        followers: 64250,
        connectedAt: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000)
      }
    ];

    const insertedPlatforms = await Platform.insertMany(platformsData);
    console.log(`Inserted ${insertedPlatforms.length} platforms.`);

    // Map platform names to objects
    const platformMap = {};
    insertedPlatforms.forEach((p) => {
      platformMap[p.platformName] = p;
    });

    console.log('Generating 90 days of daily analytics...');
    const analyticsRecords = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const platformConfigs = {
      Instagram: {
        baseFollowers: 114000,
        dailyFollowerGain: 160,
        reachMultiplier: 0.22,
        impressionsMultiplier: 0.32,
        baseLikes: 3200,
        baseComments: 280,
        baseShares: 190
      },
      Facebook: {
        baseFollowers: 81000,
        dailyFollowerGain: 92,
        reachMultiplier: 0.18,
        impressionsMultiplier: 0.26,
        baseLikes: 1950,
        baseComments: 340,
        baseShares: 310
      },
      YouTube: {
        baseFollowers: 172000,
        dailyFollowerGain: 295,
        reachMultiplier: 0.35,
        impressionsMultiplier: 0.52,
        baseLikes: 5800,
        baseComments: 720,
        baseShares: 540
      },
      X: {
        baseFollowers: 55000,
        dailyFollowerGain: 102,
        reachMultiplier: 0.28,
        impressionsMultiplier: 0.44,
        baseLikes: 2400,
        baseComments: 450,
        baseShares: 850
      }
    };

    // Generate day by day from 89 days ago up to day 0 (today)
    for (let dayOffset = 89; dayOffset >= 0; dayOffset--) {
      const recordDate = new Date(today);
      recordDate.setDate(recordDate.getDate() - dayOffset);

      // Add a slight day-of-week pattern (higher on weekends and mid-week)
      const dayOfWeek = recordDate.getDay();
      const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 1.25 : 1.0;
      const midweekBoost = dayOfWeek === 3 || dayOfWeek === 4 ? 1.15 : 1.0;
      const factor = weekendFactor * midweekBoost;

      for (const [name, cfg] of Object.entries(platformConfigs)) {
        const platform = platformMap[name];
        const daysElapsed = 89 - dayOffset;

        // Progressive follower growth with slight variance
        const randomFluctuation = Math.sin((daysElapsed / 90) * Math.PI * 4) * 45;
        const currentFollowers = Math.round(
          cfg.baseFollowers + daysElapsed * cfg.dailyFollowerGain + randomFluctuation
        );

        const noise = 0.85 + Math.random() * 0.3; // 0.85 - 1.15
        const likes = Math.round(cfg.baseLikes * factor * noise);
        const comments = Math.round(cfg.baseComments * factor * noise);
        const shares = Math.round(cfg.baseShares * factor * noise);

        const reach = Math.round(currentFollowers * cfg.reachMultiplier * factor * noise);
        const impressions = Math.round(
          reach * (1.2 + Math.random() * 0.3)
        );

        const totalEng = likes + comments + shares;
        const engagementRate = reach > 0 ? Number(((totalEng / reach) * 100).toFixed(2)) : 0;

        analyticsRecords.push({
          platformId: platform._id,
          date: recordDate,
          followers: currentFollowers,
          likes,
          comments,
          shares,
          reach,
          impressions,
          engagementRate
        });
      }
    }

    await Analytics.insertMany(analyticsRecords);
    console.log(`Inserted ${analyticsRecords.length} analytics records.`);

    // Update Platform current follower counts to match the latest records
    for (const [name, platform] of Object.entries(platformMap)) {
      const latestAnalytics = await Analytics.findOne({ platformId: platform._id }).sort({ date: -1 });
      if (latestAnalytics) {
        platform.followers = latestAnalytics.followers;
        await platform.save();
      }
    }

    console.log('Generating sample posts across platforms...');
    const postsData = [
      // Instagram Posts
      {
        platformId: platformMap['Instagram']._id,
        postTitle: '🚀 Launching our brand new AI-powered workflow analytics feature!',
        daysAgo: 2,
        likes: 4820,
        comments: 342,
        shares: 215,
        reach: 32400
      },
      {
        platformId: platformMap['Instagram']._id,
        postTitle: '✨ 5 key metrics every social media strategist must track in 2026',
        daysAgo: 5,
        likes: 3950,
        comments: 288,
        shares: 184,
        reach: 28100
      },
      {
        platformId: platformMap['Instagram']._id,
        postTitle: '📊 Behind the Scenes: How we process 10M+ events every single day',
        daysAgo: 9,
        likes: 3410,
        comments: 210,
        shares: 152,
        reach: 24500
      },
      {
        platformId: platformMap['Instagram']._id,
        postTitle: '💡 Quick Tip: Best times to post for 3x higher engagement on Reels',
        daysAgo: 14,
        likes: 5120,
        comments: 412,
        shares: 330,
        reach: 36800
      },
      {
        platformId: platformMap['Instagram']._id,
        postTitle: '🔥 Community Spotlight: How Acme Corp grew their audience by 240%',
        daysAgo: 21,
        likes: 2890,
        comments: 175,
        shares: 120,
        reach: 21200
      },

      // Facebook Posts
      {
        platformId: platformMap['Facebook']._id,
        postTitle: '📢 Big Announcement: SocialPulse 2.0 is officially live worldwide!',
        daysAgo: 3,
        likes: 2450,
        comments: 410,
        shares: 520,
        reach: 22600
      },
      {
        platformId: platformMap['Facebook']._id,
        postTitle: '📈 Whitepaper Release: The State of Enterprise Social Media ROI 2026',
        daysAgo: 8,
        likes: 1890,
        comments: 320,
        shares: 415,
        reach: 19400
      },
      {
        platformId: platformMap['Facebook']._id,
        postTitle: '💬 Discussion: What is the most overrated social media metric?',
        daysAgo: 12,
        likes: 2150,
        comments: 580,
        shares: 290,
        reach: 23100
      },
      {
        platformId: platformMap['Facebook']._id,
        postTitle: '🎥 Webinar Recording: Scaling Multi-Channel Analytics in Minutes',
        daysAgo: 19,
        likes: 1640,
        comments: 245,
        shares: 340,
        reach: 17800
      },

      // YouTube Posts / Videos
      {
        platformId: platformMap['YouTube']._id,
        postTitle: 'Full Masterclass: Building a High-Growth Multi-Platform Funnel',
        daysAgo: 4,
        likes: 8200,
        comments: 1120,
        shares: 980,
        reach: 89400
      },
      {
        platformId: platformMap['YouTube']._id,
        postTitle: 'SocialPulse Product Tour: Everything you need in one unified dashboard',
        daysAgo: 10,
        likes: 6450,
        comments: 790,
        shares: 630,
        reach: 71200
      },
      {
        platformId: platformMap['YouTube']._id,
        postTitle: 'Algorithm Breakdown: How Video Retention Drives Virality in 2026',
        daysAgo: 16,
        likes: 9340,
        comments: 1350,
        shares: 1120,
        reach: 104500
      },
      {
        platformId: platformMap['YouTube']._id,
        postTitle: '10 Mistakes Content Creators Make When Reading Analytics',
        daysAgo: 25,
        likes: 5890,
        comments: 640,
        shares: 480,
        reach: 63000
      },

      // X (Twitter) Posts
      {
        platformId: platformMap['X']._id,
        postTitle: 'Thread: 7 actionable insights from analyzing 50,000 top-performing social posts 🧵👇',
        daysAgo: 1,
        likes: 3820,
        comments: 620,
        shares: 1450,
        reach: 41200
      },
      {
        platformId: platformMap['X']._id,
        postTitle: 'Real talk: vanity metrics look good in presentations, but engagement rate pays the bills. Agree or disagree?',
        daysAgo: 6,
        likes: 2940,
        comments: 780,
        shares: 920,
        reach: 34500
      },
      {
        platformId: platformMap['X']._id,
        postTitle: 'We just shipped instantaneous 90-day comparison charts in SocialPulse! Check your dashboard now ⚡',
        daysAgo: 11,
        likes: 2150,
        comments: 310,
        shares: 640,
        reach: 26800
      },
      {
        platformId: platformMap['X']._id,
        postTitle: 'Stop posting blindly. Let the data inform your next viral concept. Here is our 3-step audit formula:',
        daysAgo: 18,
        likes: 3400,
        comments: 490,
        shares: 1180,
        reach: 38900
      },
      {
        platformId: platformMap['X']._id,
        postTitle: 'Consistency + High-Retention Hooks + Audience Segmentation = Sustainable compounding growth.',
        daysAgo: 28,
        likes: 1980,
        comments: 260,
        shares: 730,
        reach: 22400
      }
    ];

    const formattedPosts = postsData.map((p) => {
      const postDate = new Date(today);
      postDate.setDate(postDate.getDate() - p.daysAgo);
      postDate.setHours(14, 30, 0, 0);

      const totalEng = p.likes + p.comments + p.shares;
      const engagementRate = p.reach > 0 ? Number(((totalEng / p.reach) * 100).toFixed(2)) : 0;

      return {
        platformId: p.platformId,
        postTitle: p.postTitle,
        postDate,
        likes: p.likes,
        comments: p.comments,
        shares: p.shares,
        reach: p.reach,
        engagementRate
      };
    });

    await Post.insertMany(formattedPosts);
    console.log(`Inserted ${formattedPosts.length} sample posts.`);

    console.log('✅ Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
