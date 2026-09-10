// app/blog/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';

// This is a placeholder/skeleton page for blog articles
// When actual content is available, this would be populated from a CMS

export default function BlogArticle() {
  const params = useParams();
  const slug = params?.slug as string || 'article-slug';
  const [copied, setCopied] = useState(false);

  // Mock article data - in production this would come from a CMS
  const article = {
    title: 'Understanding Metabolic Resistance',
    subtitle: 'How your body adapts to weight changes and what it means for your health journey',
    author: 'Dr. Sarah Johnson, PhD',
    date: 'July 15, 2026',
    reviewDate: 'July 15, 2026',
    readingTime: '8 min read',
    category: 'Metabolism',
    body: {
      heading1: 'What is Metabolic Resistance?',
      content1: `
        Metabolic resistance refers to the body's adaptive response that can make weight change more difficult over time. 
        When you reduce caloric intake or increase physical activity, your body may respond by lowering resting metabolic rate, 
        increasing hunger signals, or altering hormone levels that influence fat storage and energy expenditure.

        This adaptive response is a normal survival mechanism that evolved to protect against starvation. However, in modern 
        environments with abundant food and sedentary lifestyles, this same mechanism can create challenges for individuals 
        trying to achieve sustainable weight change.

        Understanding metabolic resistance is crucial because it helps explain why weight loss often plateaus and why 
        maintenance can be more challenging than initial weight loss. It's not a sign of personal failure but a biological 
        response that can be addressed through strategic interventions.`,
      heading2: 'Signs and Patterns',
      content2: `
        Common signs of metabolic resistance include:

        • Weight loss that slows or stops despite continued dietary adherence
        • Increased hunger or cravings, particularly for high-calorie foods
        • Fatigue or low energy, especially during physical activity
        • Difficulty maintaining weight loss after reaching a goal
        • Changes in body temperature regulation

        Research has shown that these patterns can be influenced by factors including sleep quality, stress levels, 
        meal timing, and circadian alignment. The ROOTS-AI assessment explores these interconnected factors to help 
        individuals identify their specific biological patterns.`,
      sources: `
        Source: Adaptive thermogenesis in humans. International Journal of Obesity, 2020.
        Source: Metabolic adaptation and weight regain. The American Journal of Clinical Nutrition, 2021.
        Source: Sleep, circadian rhythms and metabolic health. Nature Reviews Endocrinology, 2022.
      `
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <main id="main" className={styles.main}>
      {/* Breadcrumb */}
      <section className={styles.breadcrumb}>
        <div className={styles.breadcrumbInner}>
          <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbCurrent}>{article.category} / {article.title}</span>
        </div>
      </section>

      {/* Article Header */}
      <section className={styles.articleHeader}>
        <div className={styles.articleHeaderInner}>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleSubtitle}>{article.subtitle}</p>
          
          <div className={styles.articleMeta}>
            <div className={styles.metaGroup}>
              <span className={styles.metaLabel}>Author</span>
              <span className={styles.metaValue}>{article.author}</span>
            </div>
            <div className={styles.metaRow}>
              <div className={styles.metaGroup}>
                <span className={styles.metaLabel}>Publication Date</span>
                <span className={styles.metaValue}>{article.date}</span>
              </div>
              <div className={styles.metaGroup}>
                <span className={styles.metaLabel}>Review Date</span>
                <span className={styles.metaValue}>{article.reviewDate}</span>
              </div>
            </div>
            <div className={styles.metaGroup}>
              <span className={styles.metaLabel}>Reading Time</span>
              <span className={styles.metaValue}>{article.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className={styles.articleBody}>
        <div className={styles.bodyInner}>
          <span className={styles.bodyLabel}>APPROVED ARTICLE BODY • MAX 720 PX</span>
          
          <h2 className={styles.bodyHeading}>{article.body.heading1}</h2>
          <div className={styles.bodyContent}>
            {article.body.content1.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          <h3 className={styles.bodySubheading}>{article.body.heading2}</h3>
          <div className={styles.bodyContent}>
            {article.body.content2.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          <div className={styles.sourcesSection}>
            <span className={styles.sourcesLabel}>SOURCES / CITATIONS</span>
            <div className={styles.sourcesContent}>
              {article.body.sources.split('\n').map((source, index) => (
                <p key={index}>{source.trim()}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Share */}
      <section className={styles.shareSection}>
        <div className={styles.shareInner}>
          <span className={styles.eyebrow}>SHARE</span>
          <button onClick={handleCopyLink} className={styles.copyButton}>
            {copied ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>
      </section>

      {/* Related Articles (Placeholder) */}
      <section className={styles.relatedSection}>
        <div className={styles.relatedInner}>
          <span className={styles.eyebrow}>RELATED • UP TO THREE APPROVED ARTICLES</span>
          <div className={styles.relatedPlaceholder}>
            <p className={styles.relatedPlaceholderText}>
              Conditional CMS region — hidden when no approved related articles exist
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className={styles.disclaimerSection}>
        <div className={styles.disclaimerInner}>
          <div className={styles.disclaimerCard}>
            <span className={styles.eyebrow}>EDUCATIONAL DISCLAIMER</span>
            <p className={styles.disclaimerText}>No article is personalized medical advice.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Continue with ROOTS-AI™</h2>
          <p className={styles.ctaSubtitle}>
            Contextual approved action: Assessment or Platform
          </p>
          <Link href="/assessment" className={styles.ctaButton}>
            Start Your Assessment
          </Link>
        </div>
      </section>
    </main>
  );
}